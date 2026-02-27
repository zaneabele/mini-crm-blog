// src/db/logs.js
const { pool } = require('./connection');

async function logError(level, message, meta = {}) {
  try {
    const [result] = await pool.query(
      'INSERT INTO logs (level, message, meta_json, created_at) VALUES (?, ?, ?, NOW())',
      [level, message, JSON.stringify(meta)]
    );
    console.log(`✅ Log ieraksts saglabāts ar ID: ${result.insertId}`);
    return result.insertId;
  } catch (error) {
    console.error('❌ Kļūda saglabājot logu:', error.message);
    throw error;
  }
}

module.exports = { logError };
