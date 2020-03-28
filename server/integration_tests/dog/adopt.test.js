const request = require('supertest');
const app = require('../../app');
const testMongoDB = require('../../test_helper/in_memory_mongodb_setup');
const Dog = require('../../models/dog');
const User = require('../../models/user');

beforeAll(testMongoDB.setup);
afterAll(testMongoDB.teardown);

const validPayload = {
  name: 'Amber',
  gender: 'female',
  description: 'Tough on the outside, soft on the inside.',
  available: true,
  hdbApproved: true
};

describe('PUT /dogs/adopt/:id', () => {
  const username = 'sabrina';
  const password = '12345678';

  const user = new User({ username, password });

  beforeEach(async () => {
    await user.save();
  });

  const token = user.generateJWT();

  it('should return 401 if user is not logged in', async () => {
    const response = await request(app)
      .put('/api/dogs/adopt/666');

    expect(response.status).toBe(401);
  });

  it('should return 404 if id provided is not valid', async () => {
    const response = await request(app)
      .put('/api/dogs/adopt/666')
      .set('Cookie', `access_token=${token}`);

    expect(response.status).toBe(404);
  });

  it('should update dog availability to false and set adopter to user', async () => {
    const dog = new Dog(validPayload);

    await dog.save();

    const dogId = dog._id;

    const response = await request(app)
      .put(`/api/dogs/adopt/${dogId}`)
      .set('Cookie', `access_token=${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.dog.name).toEqual(dog.name);
    expect(response.body.dog.available).toBe(false);
    expect(response.body.dog.adopter).toEqual(`${user._id}`);
  });
});
