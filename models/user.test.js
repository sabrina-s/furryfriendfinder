const test_mongodb = require('../test_helper/in_memory_mongodb_setup');
const ValidationError = require('mongoose').ValidationError;

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

const User = require('./user');

const username = 'sabrina';
const password = 'qwerty123';

let user = new User({ username, password });

describe('User model', () => {
  it('can be saved', async () => {
    await expect(user.save()).resolves.toBe(user);
  });

  it('can be searched by _id', async () => {
    let searchResult = await User.findById(user._id);
    expect(searchResult.username).toEqual(username);
  });
});

describe('validate uniqueness', () => {
  beforeEach(async () => await user.save());

  it('should not allow 2 users with the same username', async () => {
    let newUser = new User({ username: username, password: 'newpassword' });
    await expect(newUser.save()).rejects.toThrow(
      'username: should be unique'
    );
  });
});

describe('validate presence', () => {
  test('username is required', async () => {
    let userWithoutUsername = new User({ password: '123' });
    await expect(userWithoutUsername.save()).rejects.toThrow(ValidationError);
  });

  test('password is required', async () => {
    let userWithoutPassword = new User({ username: 'sabrina2' });
    await expect(userWithoutPassword.save()).rejects.toThrow(ValidationError);
  });
});
