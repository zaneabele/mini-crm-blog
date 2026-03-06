// __tests__/api.integration.test.js
const request = require('supertest');
const app = require('../src/server');
const { pool } = require('../db');

describe('Integrācijas testi API galapunktiem', () => {

  // Pirms visiem testiem notīrām testa datus
  beforeAll(async () => {
    await pool.query("DELETE FROM users WHERE email LIKE 'test_%'");
  });

  // Pēc visiem testiem aizveram savienojumu
  afterAll(async () => {
    await pool.end();
  });

  // === POST /users ===
  describe('POST /users', () => {
    test('Veiksmīga lietotāja izveide', async () => {
      const newUser = {
        name: 'Testa Lietotājs',
        email: 'test_user@example.com',
        password: 'parole123'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
    });

    test('Kļūda: e-pasta dublikāts', async () => {
      const duplicateUser = {
        name: 'Anna',
        email: 'anna@example.com',
        password: 'parole123'
      };

      const response = await request(app)
        .post('/users')
        .send(duplicateUser)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.error.code).toBe('DUPLICATE_EMAIL');
    });

    test('Kļūda: validācija (nederīgs e-pasts)', async () => {
      const invalidUser = {
        name: 'Test',
        email: 'nav-epasts',
        password: 'parole123'
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  // === GET /users ===
  describe('GET /users', () => {
    test('Atgriež visus lietotājus', async () => {
      const response = await request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body).toHaveProperty('page');
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('total');
    });

    test('Filtrēšana pēc e-pasta', async () => {
      const response = await request(app)
        .get('/users?email=anna@example.com')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe('anna@example.com');
    });

    test('Filtrēšana – e-pasts nav atrasts (404)', async () => {
      const response = await request(app)
        .get('/users?email=nepareizs@example.com')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body.error.code).toBe('USER_NOT_FOUND');
    });

    test('Lapošana', async () => {
      const response = await request(app)
        .get('/users?page=1&limit=1')
        .expect(200);

      expect(response.body.data.length).toBeLessThanOrEqual(1);
      expect(response.body.page).toBe(1);
      expect(response.body.limit).toBe(1);
    });
  });

  // === POST /posts ===
  describe('POST /posts', () => {
    test('Veiksmīga ieraksta izveide', async () => {
      const newPost = {
        title: 'Testa ieraksts',
        content: 'Šis ir testa ieraksta saturs, kas ir pietiekami garš.',
        user_id: 1
      };

      const response = await request(app)
        .post('/posts')
        .send(newPost)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newPost.title);
      expect(response.body.user_id).toBe(newPost.user_id);
    });

    test('Kļūda: validācija (īss virsraksts)', async () => {
      const invalidPost = {
        title: 'Aa',
        content: 'Šis ir pietiekami garš saturs testiem.',
        user_id: 1
      };

      const response = await request(app)
        .post('/posts')
        .send(invalidPost)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  // === GET /posts ===
  describe('GET /posts', () => {
    test('Atgriež visus ierakstus', async () => {
      const response = await request(app)
        .get('/posts')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('Filtrēšana pēc user_id', async () => {
      const response = await request(app)
        .get('/posts?user_id=1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});