// routes/posts.js
const express = require('express');
const { createPost, getPosts } = require('../src/db/posts');
const validatePost = require('../src/utils/validatePost');
const { logError } = require('../src/db/logs');

const router = express.Router();

// POST /posts - jauna ieraksta pievienošana
router.post('/posts', async (req, res, next) => {
  try {
    // Validācija (asinhronā!)
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

// GET /posts - visi ieraksti (ar iespēju filtrēt pēc user_id)
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
