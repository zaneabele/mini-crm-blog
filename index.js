const express = require('express');
require('dotenv').config();
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 🟢 Veselības pārbaude
app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

// 🟢 DB savienojuma pārbaude
app.get('/health/db', async (req, res) => {
  try {
    await db.testConnection();
    res.json({ status: 'OK', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', database: 'disconnected' });
  }
});

// 🟢 ŠEIT PIEVIENO POST /users MARŠRUTU!
const usersRouter = require('./routes/users');
app.use('/', usersRouter);

// 🟢 Servera palaišana
app.listen(port, () => {
  console.log(`🚀 Serveris darbojas uz porta ${port}`);
  db.testConnection();
});
