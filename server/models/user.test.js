const testMongoDB = require('../test_helper/in_memory_mongodb_setup');

beforeAll(testMongoDB.setup);
afterAll(testMongoDB.teardown);

const User = require('./user');

const username = 'sabrina';
const password = 'qwerty123';

const user = new User({ username, password });

describe('User model', () => {
  it('can be saved', async () => {
    await expect(user.save()).resolves.toBe(user);
  });

  it('can be searched by _id', async () => {
    const searchResult = await User.findById(user._id);
    expect(searchResult.username).toEqual(username);
  });
});

describe('validate uniqueness', () => {
  beforeEach(async () => {
    await user.save();
  });

  it('should not allow 2 users with the same username', async () => {
    const newUser = new User({ username, password: 'newpassword' });

    await expect(newUser.save()).rejects.toThrow();
  });
});

describe('validate presence', () => {
  test('username is required', async (done) => {
    const userWithoutUsername = new User({ password: '12345678' });

    userWithoutUsername.save((error) => {
      expect(error.errors.username.message).toEqual('Username is required.');
      done();
    });
  });

  test('password is required', async (done) => {
    const userWithoutPassword = new User({ username: 'sabrina2' });

    userWithoutPassword.save((error) => {
      expect(error.errors.password.message).toEqual('Password is required.');
      done();
    });
  });
});
