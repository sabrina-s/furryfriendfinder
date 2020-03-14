const test_mongodb = require('../test_helper/in_memory_mongodb_setup');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

describe('POST /users/register', () => {
  const username = 'register-user';
  const password = '12345678';

  let user = new User({ username, password });

  beforeEach(async () => {
    await user.save();
  })

  it('should return 200 response', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'register-user-2', password: '12345678' })

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ message: 'register-user-2 registered successfully!' });
  })

  it('should return error if username already exists', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: username, password: password })

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: 'Unable to register user.' });
  })
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
    const username = 'newuser-success';
    const password = '12345678';

    let user = new User({ username, password });

    beforeEach(async () => {
      await user.save();
    })

    it('should return 200 response with JWT token', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({ username: 'newuser-success', password: '12345678' })

      expect(response.status).toEqual(200);
      expect(response.body.message).toEqual('Login success!');
    })

    describe('JWT token generation', () => {
      it('JWT token is generated and verified', () => {
        let token = user.generateJWT();
        expect(user.verifyJWT(token)).toBeTruthy();
      })
    })
  })

  describe('on failure', () => {
    const username = 'newuser-failure';
    const password = '12345678';

    let user = new User({ username, password });

    beforeEach(async () => {
      await user.save();
    })

    it('should return 422 response if password is incorrect', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({ username: 'newuser-failure', password: 'incorrect-password' });

      expect(response.status).toEqual(422);
      expect(response.body).toEqual({ message: 'Incorrect password.'});
    })

    describe('JWT token generation', () => {
      it('JWT token cannot be verified', () => {
        let token = 'invalid-token';
        expect(user.verifyJWT(token)).toBeFalsy();
      })
    })
  })
});
