/* ================================================================
   FLIPFLOP – server.js
   Node.js + Express Backend with MongoDB
   Features: Leaderboard, Highscores, Game Sessions, Stats
   ================================================================ */

'use strict';

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const { v4: uuidv4 } = require('uuid');
const { connectDB, Score, Session } = require('./database');

const app  = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════
//  MIDDLEWARE
// ═══════════════════════════════════════════════════════
app.use(helmet());
app.use(cors({
  origin: '*',  // Change to your frontend URL in production e.g. 'http://localhost:5500'
  methods: ['GET', 'POST', 'DELETE'],
}));
app.use(express.json());
app.use(morgan('dev'));

// Serve your frontend files statically (put index.html, style.css, game.js here)
app.use(express.static('public'));

// IN-MEMORY DATABASE (fallback if MongoDB not available)
const DB = {
  leaderboard: [],
  sessions:    {},
  stats:       {
    totalGames:  0,
    totalMoves:  0,
    totalTime:   0,
    gamesPerMode: { easy: 0, medium: 0, hard: 0 }
  }
};

// Initialize database
let isMongoConnected = false;
connectDB().then(() => {
  isMongoConnected = true;
}).catch(() => {
  isMongoConnected = false;
});

// ═══════════════════════════════════════════════════════
//  HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════
function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function getTopScores(difficulty, limit = 10) {
  return DB.leaderboard
    .filter(s => !difficulty || s.difficulty === difficulty)
    .sort((a, b) => a.moves - b.moves || a.time - b.time)
    .slice(0, limit);
}

function isHighScore(moves, time, difficulty) {
  const top = getTopScores(difficulty, 10);
  if (top.length < 10) return true;
  const worst = top[top.length - 1];
  return moves < worst.moves || (moves === worst.moves && time < worst.time);
}

// ═══════════════════════════════════════════════════════
//  ROUTES
// ═══════════════════════════════════════════════════════

// ── Health Check ──────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🎮 FlipFlop server is running!', timestamp: new Date().toISOString() });
});

// ── START GAME SESSION ────────────────────────────────
// POST /api/session/start
// Body: { playerName: "Alice", difficulty: "easy" }
app.post('/api/session/start', (req, res) => {
  const { playerName, difficulty } = req.body;

  if (!playerName || !difficulty) {
    return res.status(400).json({ error: 'playerName and difficulty are required' });
  }
  if (!['easy', 'medium', 'hard'].includes(difficulty)) {
    return res.status(400).json({ error: 'difficulty must be easy | medium | hard' });
  }

  const sessionId = uuidv4();
  DB.sessions[sessionId] = {
    sessionId,
    playerName: playerName.trim().slice(0, 20),
    difficulty,
    startedAt: Date.now(),
    moves: 0,
    completed: false
  };

  DB.stats.totalGames++;
  DB.stats.gamesPerMode[difficulty]++;

  console.log(`▶  Session started: ${sessionId} | ${playerName} | ${difficulty}`);
  res.status(201).json({ sessionId, message: 'Game session started!' });
});

// ── COMPLETE GAME SESSION ────────────────────────────
// POST /api/session/complete
// Body: { sessionId: "...", moves: 14, time: 45 }
app.post('/api/session/complete', async (req, res) => {
  const { sessionId, moves, time } = req.body;

  if (!sessionId || moves == null || time == null) {
    return res.status(400).json({ error: 'sessionId, moves, and time are required' });
  }

  const session = DB.sessions[sessionId];
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  if (session.completed) {
    return res.status(409).json({ error: 'Session already completed' });
  }

  // Validate moves/time are reasonable numbers
  const movesNum = parseInt(moves, 10);
  const timeNum  = parseInt(time, 10);
  if (isNaN(movesNum) || isNaN(timeNum) || movesNum < 1 || timeNum < 1) {
    return res.status(400).json({ error: 'Invalid moves or time values' });
  }

  session.moves     = movesNum;
  session.time      = timeNum;
  session.completed = true;
  session.completedAt = Date.now();

  DB.stats.totalMoves += movesNum;
  DB.stats.totalTime  += timeNum;

  // Check if it's a highscore
  const newHS = isHighScore(movesNum, timeNum, session.difficulty);

  // Save to leaderboard
  const entry = {
    id:         uuidv4(),
    playerName: session.playerName,
    difficulty: session.difficulty,
    moves:      movesNum,
    time:       timeNum,
    timeFormatted: formatTime(timeNum),
    date:       new Date().toISOString()
  };
  DB.leaderboard.push(entry);

  // Also save to MongoDB if available
  if (isMongoConnected) {
    try {
      await Score.create({
        playerName: session.playerName,
        difficulty: session.difficulty,
        moves: movesNum,
        time: timeNum
      });
    } catch (error) {
      console.log('⚠️ Could not save to MongoDB:', error.message);
    }
  }

  // Keep leaderboard trimmed to top 100
  DB.leaderboard = DB.leaderboard
    .sort((a, b) => a.moves - b.moves || a.time - b.time)
    .slice(0, 100);

  console.log(`🏆 Completed: ${session.playerName} | ${session.difficulty} | moves:${movesNum} | time:${timeNum}s`);

  res.json({
    message:      'Game completed!',
    isNewHighScore: newHS,
    rank:         DB.leaderboard.findIndex(e => e.id === entry.id) + 1,
    entry
  });
});

// ── GET LEADERBOARD ───────────────────────────────────
// GET /api/leaderboard?difficulty=easy&limit=10
app.get('/api/leaderboard', async (req, res) => {
  const { difficulty, limit = 10 } = req.query;

  if (difficulty && !['easy', 'medium', 'hard', 'all'].includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid difficulty filter' });
  }

  const limitNum = Math.min(parseInt(limit, 10) || 10, 50);
  const diff     = difficulty === 'all' ? null : difficulty;
  
  // Try to get from MongoDB first
  let scores = [];
  if (isMongoConnected) {
    try {
      const query = diff ? { difficulty: diff } : {};
      scores = await Score.find(query).sort({ moves: 1, time: 1 }).limit(limitNum).lean();
    } catch (error) {
      console.log('⚠️ Could not fetch from MongoDB:', error.message);
    }
  }
  
  // Fall back to in-memory if MongoDB unavailable
  if (scores.length === 0) {
    scores = getTopScores(diff, limitNum);
  }

  res.json({
    difficulty: difficulty || 'all',
    count:      scores.length,
    leaderboard: scores.map((s, i) => ({ rank: i + 1, ...s }))
  });
});

// ── GET GLOBAL STATS ──────────────────────────────────
// GET /api/stats
app.get('/api/stats', (req, res) => {
  const avgMoves = DB.stats.totalGames
    ? Math.round(DB.stats.totalMoves / DB.stats.totalGames)
    : 0;
  const avgTime = DB.stats.totalGames
    ? Math.round(DB.stats.totalTime / DB.stats.totalGames)
    : 0;

  res.json({
    totalGames:   DB.stats.totalGames,
    totalMoves:   DB.stats.totalMoves,
    totalTime:    DB.stats.totalTime,
    avgMoves,
    avgTime,
    avgTimeFormatted: formatTime(avgTime),
    gamesPerMode: DB.stats.gamesPerMode,
    topScores: {
      easy:   getTopScores('easy',   1)[0]   || null,
      medium: getTopScores('medium', 1)[0]   || null,
      hard:   getTopScores('hard',   1)[0]   || null,
    }
  });
});

// ── GET PLAYER BEST SCORES ────────────────────────────
// GET /api/player/:name/scores
app.get('/api/player/:name/scores', (req, res) => {
  const name    = req.params.name.toLowerCase();
  const scores  = DB.leaderboard
    .filter(s => s.playerName.toLowerCase() === name)
    .sort((a, b) => a.moves - b.moves || a.time - b.time);

  if (!scores.length) {
    return res.status(404).json({ error: 'Player not found' });
  }

  // Best per mode
  const best = {};
  ['easy', 'medium', 'hard'].forEach(diff => {
    const s = scores.filter(x => x.difficulty === diff)[0];
    if (s) best[diff] = s;
  });

  res.json({ playerName: req.params.name, totalGames: scores.length, best, allScores: scores });
});

// ── DELETE SESSION (cleanup) ──────────────────────────
// DELETE /api/session/:id
app.delete('/api/session/:id', (req, res) => {
  const { id } = req.params;
  if (!DB.sessions[id]) {
    return res.status(404).json({ error: 'Session not found' });
  }
  delete DB.sessions[id];
  res.json({ message: 'Session deleted' });
});

// ── 404 FALLBACK ─────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ═══════════════════════════════════════════════════════
//  START SERVER
// ═══════════════════════════════════════════════════════
app.listen(PORT, () => {
  console.log(`\n🎮 FlipFlop Backend running on http://localhost:${PORT}`);
  console.log(`📋 API Docs: http://localhost:${PORT}/api/health\n`);
});