const test_mongodb = require('../test_helper/in_memory_mongodb_setup');
const request = require('supertest');
const app = require('../app');

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

describe('GET /dogs', () => {
  it('should return a list of dogs', async () => {
    await request(app)
      .get('/api/dogs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

describe('POST /dogs', () => {
  const validPayload = {
    'name': 'NewDoggo',
    'gender': 'male',
    'description': 'Tough on the outside, soft on the inside.',
    'available': true,
    'hdbApproved': false
  };

  const invalidPayload = {
    'name': 'NewDoggo',
    'gender': 'male'
  };

  it('should add new dog into database', async () => {
    await request(app)
      .post('/api/dogs')
      .send(validPayload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  });

  it('should return 400 if payload is invalid', async () => {
    await request(app)
      .post('/api/dogs')
      .send(invalidPayload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
  });
});
