const express = require('express');

const app = express();

// Veselības pārbaude
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = app;
