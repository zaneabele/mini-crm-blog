const express = require('express');
const bcrypt = require('bcrypt');
const { createUser, getUsers, getUserByEmail } = require('../db');
const validateUser = require('../utils/validateUser');

const router = express.Router();

router.post('/users', async (req, res, next) => {
  try {
    // 1. Validācija
    const errors = validateUser(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: errors.join('; ')
        }
      });
    }

    // 2. Dati
    const { name, email, password } = req.body;

    // 3. Paroles hash
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. Izveido lietotāju
    const userId = await createUser(name.trim(), email.trim().toLowerCase(), passwordHash);

    // 5. Atbilde
    res.status(201).json({
      id: userId,
      name: name.trim(),
      email: email.trim().toLowerCase()
    });

  } catch (err) {
    // 6. Dublikāta e-pasts
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        error: {
          code: 'DUPLICATE_EMAIL',
          message: 'Lietotājs ar šādu e-pastu jau eksistē.'
        }
      });
    }
    // 7. Citas kļūdas
    next(err);
  }
});

// GET /users - visi lietotāji ar filtrēšanu un lapošanu
router.get('/users', async (req, res, next) => {
  try {
    const { email, page = 1, limit = 10 } = req.query;

    // 1. Ja ir e-pasta filtrs – atgriež tikai vienu lietotāju
    if (email) {
      // 🔴 ŠEIT BIJA KĻŪDA – izlabots!
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(404).json({
          error: {
            code: 'USER_NOT_FOUND',
            message: 'Lietotājs ar šādu e-pastu nav atrasts.'
          }
        });
      }
      // Neatgriežam paroli
      const { password_hash, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    }

    // 2. Visi lietotāji ar lapošanu
    // 🔴 ŠEIT BIJA KĻŪDA – izlabots!
    const allUsers = await getUsers();

    // Lapošanas loģika
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
