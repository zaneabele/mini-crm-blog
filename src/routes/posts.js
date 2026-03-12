// src/routes/posts.js
const express = require('express');
const { createPost, getPosts } = require('../db/posts');
const validatePost = require('../utils/validatePost');
const { logError } = require('../db/logs');

const router = express.Router();

router.post('/posts', async (req, res, next) => {
  try {
    const errors = await validatePost(req.body);
    if (errors.length > 0) {
      await logError('WARN', 'Validācijas kļūda (posts)', { errors, body: req.body });
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: errors.join('; ')
        }
      });
    }

    const { title, content, user_id } = req.body;
    const postId = await createPost(title, content, user_id);

    res.status(201).json({
      id: postId,
      title: title.trim(),
      content: content.trim(),
      user_id: parseInt(user_id),
      created_at: new Date().toISOString()
    });

  } catch (err) {
    next(err);
  }
});

router.get('/posts', async (req, res, next) => {
  try {
    const { user_id } = req.query;
    const posts = await getPosts(user_id ? parseInt(user_id) : null);

    res.json({
      count: posts.length,
      data: posts
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;