// src/server.js
const express = require('express');
require('dotenv').config();
const { testConnection } = require('./db/connection');

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`🚀 Serveris klausās uz porta ${port}`);
    testConnection();
});