const test_mongodb = require('../../test_helper/in_memory_mongodb_setup');
const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user');

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

describe('PUT /users/change_password', () => {
  const username = 'sabrina';
  const password = '12345678';

  let user = new User({ username, password });
  let token = user.generateJWT();

  beforeEach(async () => {
    await user.save();
  })

  it('should return 200 response and set the new password for the user', async () => {
    const { password: savedPassword } = await User.findById(user.id);

    const response = await request(app)
      .put('/api/users/change_password')
      .set('Cookie', `access_token=${token}`)
      .send({ password: 'new-password-123' })

    const { password: newPassword } = await User.findById(user.id);

    expect(response.status).toEqual(200);
    expect(savedPassword).not.toEqual(newPassword);
  })
});
