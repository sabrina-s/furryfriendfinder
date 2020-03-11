const test_mongodb = require('../test_helper/in_memory_mongodb_setup');
const request = require('supertest');
const app = require('../app');

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

describe('GET /dogs', () => {
  it('should return 401 error if access token is missing', async () => {
    await request(app)
      .get('/api/dogs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
  });
});
