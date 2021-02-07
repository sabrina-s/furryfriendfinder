const request = require("supertest");
const app = require("../app");
const testMongoDB = require("../test_helper/in_memory_mongodb_setup");
const Dog = require("../models/dog.model");

beforeAll(testMongoDB.setup);
afterAll(testMongoDB.teardown);

const validPayload = {
  name: "Tony",
  gender: "male",
  description: "Tough on the outside, soft on the inside.",
  available: true,
  hdbApproved: false,
};

const invalidPayload = {
  name: "NewDoggo",
  gender: "male",
};

describe("GET /dogs", () => {
  it("should return a list of dogs", async () => {
    await Dog.collection.insertOne(validPayload);

    const response = await request(app).get("/api/dogs");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body.some((dog) => dog.name === "Tony")).toBeTruthy();
  });
});

describe("POST /dogs", () => {
  it("should add new dog into database", async () => {
    await request(app)
      .post("/api/dogs")
      .send(validPayload)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("should return 400 if payload is invalid", async () => {
    await request(app)
      .post("/api/dogs")
      .send(invalidPayload)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
