# 🎮 FlipFlop – Node.js Backend

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run server (development with auto-reload)
npm run dev

# 3. Or run in production
npm start
```

Server runs at → **http://localhost:3000**

---

## 📁 File Structure

```
flipflop-backend/
├── server.js      ← Main Express server
├── package.json   ← Dependencies
├── api.js         ← Frontend integration helper (copy next to game.js)
└── public/        ← Put your index.html, style.css, game.js here
    ├── index.html
    ├── style.css
    ├── game.js
    └── api.js
```

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET  | `/api/health` | Health check |
| POST | `/api/session/start` | Start a game session |
| POST | `/api/session/complete` | Submit score when game is won |
| GET  | `/api/leaderboard` | Get top scores |
| GET  | `/api/stats` | Global game statistics |
| GET  | `/api/player/:name/scores` | Get a player's scores |
| DELETE | `/api/session/:id` | Clean up a session |

---

## 📡 Example API Calls

### Start Session
```json
POST /api/session/start
{ "playerName": "Alice", "difficulty": "easy" }

→ { "sessionId": "abc-123", "message": "Game session started!" }
```

### Complete Game
```json
POST /api/session/complete
{ "sessionId": "abc-123", "moves": 14, "time": 45 }

→ { "isNewHighScore": true, "rank": 2, "entry": { ... } }
```

### Get Leaderboard
```
GET /api/leaderboard?difficulty=easy&limit=10

→ { "leaderboard": [{ "rank": 1, "playerName": "Alice", "moves": 12 ... }] }
```

---

## 🔧 Frontend Integration (3 steps)

1. Copy `api.js` next to your `game.js`
2. Add `<script src="api.js"></script>` **before** `<script src="game.js"></script>` in `index.html`
3. Follow the instructions inside `api.js` comments to wire up 4 lines in `game.js`

---

## 🚀 Deploy to Production

For production, replace in-memory DB with a real database:

- **MongoDB** → use `mongoose`
- **PostgreSQL** → use `pg` or `prisma`
- **SQLite** → use `better-sqlite3` (easiest for small projects)

Change `origin: '*'` in `server.js` CORS config to your actual frontend URL.