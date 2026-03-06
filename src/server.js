// src/server.js
const express = require('express');
require('dotenv').config();
const { testConnection } = require('./db/connection');
const errorHandler = require('./middleware/errorHandler');
const usersRouter = require('../routes/users');
const postsRouter = require('../routes/posts');

const app = express();
const port = process.env.PORT || 3000;

// Lai lasītu JSON no pieprasījumiem
app.use(express.json());

// Statisko failu mape (public/)
app.use(express.static('public'));  // <-- PIEVIENOTS!

app.get('/health', async (req, res) => {
  try {
    const isDbConnected = await testConnection();
    if (isDbConnected) {
      res.json({ status: 'ok', db: 'connected' });
    } else {
      res.json({ status: 'ok', db: 'error' });
    }
  } catch (error) {
    res.json({ status: 'ok', db: 'error' });
  }
});

app.get('/', (req, res) => {
  res.send('Serveris darbojas!');
});

// Lietotāju maršruti
app.use('/', usersRouter);
app.use('/', postsRouter);

// Kļūdu apstrādātājs
app.use(errorHandler);

// Pārbauda, vai tas nav testu režīms
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Serveris klausās uz porta ${port}`);
    testConnection();
  });
}

module.exports = app; // <-- EKSPORTĒ app testiem!;