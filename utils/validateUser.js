/**
 * Lietotāja datu validācija
 * @param {Object} data - { name, email, password }
 * @returns {Array} - Kļūdu saraksts (tukšs, ja viss der)
 */
function validateUser(data) {
  const errors = [];

  // 1. Vārds: obligāts, vismaz 2 rakstzīmes
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Vārds ir obligāts un nedrīkst būt īsāks par 2 rakstzīmēm.');
  }

  // 2. E-pasts: obligāts, pareizs formāts
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email.trim())) {
    errors.push('Derīgs e-pasts ir obligāts.');
  }

  // 3. Parole: obligāta, vismaz 6 rakstzīmes
  if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
    errors.push('Parolei jābūt vismaz 6 rakstzīmju garai.');
  }

  return errors;
}

module.exports = validateUser;