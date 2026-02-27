// routes/users.js
const express = require('express');
const bcrypt = require('bcrypt');
const { createUser, getUsers, getUserByEmail } = require('../db');
const validateUser = require('../utils/validateUser');
const { logError } = require('../src/db/logs');

const router = express.Router();

// POST /users
router.post('/users', async (req, res, next) => {
  try {
    const errors = validateUser(req.body);
    if (errors.length > 0) {
      // Ieraksta validācijas kļūdu žurnālā
      await logError('WARN', 'Validācijas kļūda', { errors, body: req.body });
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: errors.join('; ')
        }
      });
    }

    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await createUser(name.trim(), email.trim().toLowerCase(), passwordHash);

    res.status(201).json({
      id: userId,
      name: name.trim(),
      email: email.trim().toLowerCase()
    });

  } catch (err) {
    // Dublikāta e-pasts
    if (err.code === 'ER_DUP_ENTRY') {
      await logError('WARN', 'Dublikāta e-pasts', { email: req.body.email });
      return res.status(400).json({
        error: {
          code: 'DUPLICATE_EMAIL',
          message: 'Lietotājs ar šādu e-pastu jau eksistē.'
        }
      });
    }
    // Citas kļūdas tiek nodotas kļūdu apstrādātājam
    next(err);
  }
});

// GET /users
router.get('/users', async (req, res, next) => {
  try {
    const { email, page = 1, limit = 10 } = req.query;

    if (email) {
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(404).json({
          error: {
            code: 'USER_NOT_FOUND',
            message: 'Lietotājs ar šādu e-pastu nav atrasts.'
          }
        });
      }
      const { password_hash, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    }

    const allUsers = await getUsers();
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;
    const paginatedUsers = allUsers.slice(start, end).map(user => {
      const { password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json({
      page: pageNum,
      limit: limitNum,
      total: allUsers.length,
      data: paginatedUsers
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;