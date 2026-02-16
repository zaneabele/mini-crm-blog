const request = require('supertest');
const app = require('../index'); // tavam index.js jābūt ar module.exports = app

describe('POST /users integrācijas testi', () => {
  
  test('Veiksmīga lietotāja izveide', async () => {
    const newUser = {
      name: 'Testa Lietotājs',
      email: 'tests@example.com',
      password: 'parole123'
    };

    const response = await request(app)
      .post('/users')
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  test('Kļūda 400 – e-pasta dublikāts', async () => {
    const duplicateUser = {
      name: 'Anna',
      email: 'anna@example.com',
      password: 'parole123'
    };

    const response = await request(app)
      .post('/users')
      .send(duplicateUser)
      .expect(400);

    expect(response.body.error.code).toBe('DUPLICATE_EMAIL');
  });
});
