const request = require('supertest');
const app = require('../app');

describe('GET /dogs', () => {
  it('should return a list of dogs', () => {
    request(app)
      .get('/dogs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
