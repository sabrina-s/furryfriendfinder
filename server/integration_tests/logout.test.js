const test_mongodb = require('../test_helper/in_memory_mongodb_setup');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

describe('POST /users/logout', () => {
  const username = 'sabrina';
  const password = '12345678';

  let user = new User({ username, password });

  beforeEach(async () => {
    await user.save();
  })

  it('should return 200 response', async () => {
    const response = await request(app)
      .post('/api/users/logout')

    expect(response.status).toEqual(200);
  })

  // it('should clear access_token from cookies', async () => {
  // })
});
