const request = require('supertest');
const app = require('../app');
const testMongoDB = require('../test_helper/in_memory_mongodb_setup');
const Dog = require('../models/dog');
const User = require('../models/user');

beforeAll(testMongoDB.setup);
afterAll(testMongoDB.teardown);

const validPayload = {
  name: 'Tony',
  gender: 'male',
  description: 'Tough on the outside, soft on the inside.',
  available: true,
  hdbApproved: false
};

const validPayload2 = {
  name: 'Amber',
  gender: 'female',
  description: 'Tough on the outside, soft on the inside.',
  available: true,
  hdbApproved: true
};

const invalidPayload = {
  name: 'NewDoggo',
  gender: 'male'
};

describe('GET /dogs', () => {
  it('should return a list of dogs', async () => {
    await Dog.collection.insertOne(validPayload);

    const response = await request(app).get('/api/dogs');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body.some((dog) => dog.name === 'Tony')).toBeTruthy();
  });
});

describe('POST /dogs', () => {
  it('should add new dog into database', async () => {
    await request(app)
      .post('/api/dogs')
      .send(validPayload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should return 400 if payload is invalid', async () => {
    await request(app)
      .post('/api/dogs')
      .send(invalidPayload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });
});

describe('PUT /dogs/adopt/:id', () => {
  it('should update dog availability to false', async () => {
    const username = 'sabrina';
    const password = '12345678';

    const user = new User({ username, password });
    const dog = new Dog(validPayload2);

    beforeEach(async () => {
      await user.save();
      await dog.save();
    });

    const token = user.generateJWT();
    const dogId = await dog._id;

    const response = await request(app)
      .put(`/api/dogs/adopt/${dogId}`)
      .set('Cookie', `access_token=${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('name', dog.name);
  });

  it('should return 404 if id provided is not valid', async () => {
    const response = await request(app).put('/api/dogs/adopt/666');

    expect(response.status).toBe(404);
  });
});
