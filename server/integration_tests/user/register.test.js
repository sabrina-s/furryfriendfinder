const request = require('supertest');
const testMongoDB = require('../../test_helper/in_memory_mongodb_setup');
const app = require('../../app');
const User = require('../../models/user');

beforeAll(testMongoDB.setup);
afterAll(testMongoDB.teardown);

describe('POST /users/register', () => {
  const username = 'register-user';
  const password = '12345678';

  const user = new User({ username, password });

  beforeEach(async () => {
    await user.save();
  });

  it('should return 200 response', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'register-user-2', password: '12345678' });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: 'register-user-2 registered successfully!',
      user: {
        username: 'register-user-2'
      }
    });
  });

  it('should return error if username already exists', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username, password });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: 'Unable to register user.' });
  });
});
