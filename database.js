const mongoose = require('mongoose');

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.log('❌ MongoDB Error:', error.message);
    console.log('⚠️  Running without database (in-memory mode)');
  }
}

// Score Schema
const scoreSchema = new mongoose.Schema({
  playerName: String,
  difficulty: String,
  moves: Number,
  time: Number,
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);

// Session Schema
const sessionSchema = new mongoose.Schema({
  sessionId: String,
  playerName: String,
  difficulty: String,
  status: { type: String, default: 'active' },
  moves: Number,
  time: Number,
  createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = { connectDB, Score, Session };
