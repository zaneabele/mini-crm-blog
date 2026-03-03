// src/utils/validatePost.js
const { getUserById } = require('../../db');

async function validatePost(data) {
  const errors = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) {
    errors.push('Virsraksts ir obligāts un nedrīkst būt īsāks par 3 rakstzīmēm.');
  }

  if (!data.content || typeof data.content !== 'string' || data.content.trim().length < 10) {
    errors.push('Saturs ir obligāts un nedrīkst būt īsāks par 10 rakstzīmēm.');
  }

  if (!data.user_id || isNaN(parseInt(data.user_id))) {
    errors.push('Lietotāja ID ir obligāts un tam jābūt skaitlim.');
  } else {
    try {
      const user = await getUserById(parseInt(data.user_id));
      if (!user) {
        errors.push('Lietotājs ar šādu ID neeksistē.');
      }
    } catch (error) {
      errors.push('Kļūda, pārbaudot lietotāja esamību.');
    }
  }

  return errors;
}

module.exports = validatePost;
