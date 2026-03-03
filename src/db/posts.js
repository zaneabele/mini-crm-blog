// src/db/posts.js
const { pool } = require('./connection');

/**
 * Izveido jaunu ierakstu (post)
 */
async function createPost(title, content, userId) {
  try {
    const [result] = await pool.query(
      'INSERT INTO posts (title, content, user_id, created_at) VALUES (?, ?, ?, NOW())',
      [title.trim(), content.trim(), userId]
    );
    console.log(`✅ Ieraksts izveidots ar ID: ${result.insertId}`);
    return result.insertId;
  } catch (error) {
    console.error('❌ Kļūda veidojot ierakstu:', error.message);
    throw error;
  }
}

/**
 * Atgriež visus ierakstus kopā ar autora e-pastu (JOIN)
 * @param {number} userId - ja norādīts, filtrē pēc autora
 */
async function getPosts(userId = null) {
  try {
    let query = `
      SELECT 
        posts.id,
        posts.title,
        posts.content,
        users.id AS user_id,
        users.name AS author_name,
        users.email AS author_email,
        posts.created_at
      FROM posts
      JOIN users ON posts.user_id = users.id
    `;
    const params = [];

    if (userId) {
      query += ' WHERE users.id = ?';
      params.push(userId);
    }

    query += ' ORDER BY posts.created_at DESC';

    const [rows] = await pool.query(query, params);
    console.log(`✅ Ielasīti ${rows.length} ieraksti`);
    return rows;
  } catch (error) {
    console.error('❌ Kļūda lasot ierakstus:', error.message);
    throw error;
  }
}

module.exports = { createPost, getPosts };
