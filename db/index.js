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

async function createUser(name, email, passwordHash) {
    try {
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, passwordHash]
        );
        console.log(`✅ Lietotājs izveidots ar ID: ${result.insertId}`);
        return result.insertId;
    } catch (error) {
        console.error('❌ Kļūda veidojot lietotāju:', error.message);
        throw error;
    }
}

async function getUsers() {
    try {
        const [rows] = await pool.query(
            'SELECT id, name, email, created_at FROM users ORDER BY id DESC'
        );
        console.log(`✅ Ielasīti ${rows.length} lietotāji`);
        return rows;
    } catch (error) {
        console.error('❌ Kļūda lasot lietotājus:', error.message);
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
        const [rows] = await pool.query(
            'SELECT id, name, email, password_hash, created_at FROM users WHERE email = ?',
            [email]
        );
        return rows[0] || null;
    } catch (error) {
        console.error('❌ Kļūda meklējot lietotāju:', error.message);
        throw error;
    }
}

module.exports = {
    pool,
    testConnection,
    createUser,
    getUsers,
    getUserByEmail
};
