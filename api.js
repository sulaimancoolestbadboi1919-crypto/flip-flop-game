/* ================================================================
   FLIPFLOP – api.js
   Drop this file next to your game.js and include it BEFORE game.js
   in your index.html:
     <script src="api.js"></script>
     <script src="game.js"></script>
   ================================================================ */

'use strict';

const API_BASE = 'http://localhost:3000/api';  // Change to your server URL in production

const FlipFlopAPI = {

  // ── Start a new game session ───────────────────────
  // Call this when a mode is selected (before startGame())
  async startSession(playerName, difficulty) {
    try {
      const res = await fetch(`${API_BASE}/session/start`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ playerName, difficulty })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      console.log('✅ Session started:', data.sessionId);
      return data.sessionId;
    } catch (err) {
      console.warn('⚠️ API startSession failed (offline mode):', err.message);
      return null;  // Game works offline too!
    }
  },

  // ── Complete a game session ────────────────────────
  // Call this inside triggerWin() before showing the win popup
  async completeSession(sessionId, moves, time) {
    if (!sessionId) return null;
    try {
      const res = await fetch(`${API_BASE}/session/complete`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ sessionId, moves, time })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      console.log(`🏆 Rank #${data.rank} | New HS: ${data.isNewHighScore}`);
      return data;  // { isNewHighScore, rank, entry }
    } catch (err) {
      console.warn('⚠️ API completeSession failed:', err.message);
      return null;
    }
  },

  // ── Fetch leaderboard ─────────────────────────────
  // difficulty: 'easy' | 'medium' | 'hard' | 'all'
  async getLeaderboard(difficulty = 'all', limit = 10) {
    try {
      const res  = await fetch(`${API_BASE}/leaderboard?difficulty=${difficulty}&limit=${limit}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data.leaderboard;  // [{ rank, playerName, difficulty, moves, time, date }]
    } catch (err) {
      console.warn('⚠️ API getLeaderboard failed:', err.message);
      return [];
    }
  },

  // ── Fetch global stats ────────────────────────────
  async getStats() {
    try {
      const res  = await fetch(`${API_BASE}/stats`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    } catch (err) {
      console.warn('⚠️ API getStats failed:', err.message);
      return null;
    }
  },

  // ── Fetch a player's scores ───────────────────────
  async getPlayerScores(playerName) {
    try {
      const res  = await fetch(`${API_BASE}/player/${encodeURIComponent(playerName)}/scores`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    } catch (err) {
      console.warn('⚠️ API getPlayerScores failed:', err.message);
      return null;
    }
  }
};

/* ================================================================
   HOW TO WIRE THIS INTO YOUR game.js
   ================================================================

   1. ADD a playerName field to your mode popup HTML:
      <input id="playerNameInput" type="text" placeholder="Your Name" maxlength="20" />

   2. IN startGame(difficultyKey):
      const playerName = document.getElementById('playerNameInput')?.value.trim() || 'Player';
      State.sessionId = await FlipFlopAPI.startSession(playerName, difficultyKey);

   3. ADD sessionId to State object:
      const State = {
        ...
        sessionId: null,   // ← add this line
        ...
      };

   4. IN triggerWin(), BEFORE openOverlay(DOM.winOverlay):
      const result = await FlipFlopAPI.completeSession(State.sessionId, State.moves, State.time);
      if (result?.isNewHighScore) {
        DOM.newHighscoreRow.classList.add('show');
      }

   ================================================================ */