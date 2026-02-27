// src/middleware/errorHandler.js
const { logError } = require('../db/logs');

function errorHandler(err, req, res, next) {
  try {
    logError('ERROR', err.message, { 
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      body: req.body 
    });
  } catch (logErr) {
    console.error('Neizdevās ierakstīt kļūdu datubāzē:', logErr.message);
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Notikusi iekšēja servera kļūda'
    }
  });
}

module.exports = errorHandler;