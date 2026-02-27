// src/db/connection.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'prakse',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL datubāze pieslēgta!');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Datubāzes savienojuma kļūda:', error.message);
        return false;
    }
}

module.exports = { pool, testConnection };