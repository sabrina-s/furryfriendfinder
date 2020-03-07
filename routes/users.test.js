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

  describe('on success', () => {
    it('should return 200 response on success login', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({ username: 'amanda', password: '12345678' })

      expect(response.status).toEqual(200);
      expect(response.body.message).toEqual('Login success!');
    })

    describe('JWT tokens', () => {
      const username = 'newuser-success';
      const password = '12345678';

      let user = new User({ username, password });

      beforeEach(async () => {
        await user.save();
      })

      it('JWT token is generated and verified on success', () => {
        let token = user.generateJWT();
        expect(user.verifyJWT(token)).toBeTruthy();
      })
    })
  })

  describe('on failure', () => {
    it('should return 422 response if password is incorrect', async () => {
      const response = await request(app)
      .post('/api/users/login')
      .send({ username: 'amanda', password: 'incorrect-password' });

      expect(response.status).toEqual(422);
      expect(response.body).toEqual({ message: 'Incorrect password.'});
    })

    describe('JWT tokens', () => {
      const username = 'newuser-failure';
      const password = '12345678';

      let user = new User({ username, password });

      beforeEach(async () => {
        await user.save();
      })

      it('JWT token cannot be verified on failure', () => {
        let token = 'invalid-token';
        expect(user.verifyJWT(token)).toBeFalsy();
      })
    })
  })
});
