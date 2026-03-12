// src/server.js
const express = require('express');
require('dotenv').config();
const { testConnection } = require('./db/connection');
const errorHandler = require('./middleware/errorHandler');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

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

app.use('/', usersRouter);
app.use('/', postsRouter);
app.use(errorHandler);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Serveris klausās uz porta ${port}`);
    testConnection();
  });
}

module.exports = app;