const test_mongodb = require('../../test_helper/in_memory_mongodb_setup');

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

const User = require('./user');

describe('User model', () => {
  const username = 'sabrina';
  const password = 'qwerty123';

  let user = new User({ username, password });

  it('can be saved', async () => {
    await expect(user.save()).resolves.toBe(user);
  });
});
