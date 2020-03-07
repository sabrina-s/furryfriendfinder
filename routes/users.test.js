const test_mongodb = require('../test_helper/in_memory_mongodb_setup');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

beforeAll(async () => {
  const username = 'amanda';
  const password = '12345678';

  let user = new User({ username, password });
  await user.save();
})

describe('POST /users/login', () => {
  it('should return error if user does not exist', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ username: 'Sabrina', password: '12345678' })

    expect(response.status).toEqual(422);
    expect(response.body).toEqual({ message: 'User does not exist.' });
  })

  it('should return 200 response with JWT token on success login', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ username: 'amanda', password: '12345678' })

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('Login success!');
    // JWT expect(response.body.token).toEqual("");
  })

  it('should return 422 response if password is incorrect', async () => {
    const response = await request(app)
    .post('/api/users/login')
    .send({ username: 'amanda', password: 'incorrect-password' });

    expect(response.status).toEqual(422);
    expect(response.body).toEqual({ message: 'Incorrect password.'});
  })
});
