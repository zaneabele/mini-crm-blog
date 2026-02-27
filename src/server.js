// src/server.js
const express = require('express');
require('dotenv').config();
const { testConnection } = require('./db/connection');
const errorHandler = require('./middleware/errorHandler');
const usersRouter = require('../routes/users');

const app = express();
const port = process.env.PORT || 3000;

// Lai lasītu JSON no pieprasījumiem
app.use(express.json());

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

// Kļūdu apstrādātājs (jābūt PĒC visiem maršrutiem!)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Serveris klausās uz porta ${port}`);
  testConnection();
});