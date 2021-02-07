const request = require("supertest");
const testMongoDB = require("../../test_helper/in_memory_mongodb_setup");
const app = require("../../app");
const User = require("../../models/user.model");

beforeAll(testMongoDB.setup);
afterAll(testMongoDB.teardown);

describe("POST /users/logout", () => {
  const username = "sabrina";
  const password = "12345678";

  let user = new User({ username, password });

  beforeEach(async () => {
    await user.save();
  });

  it("should return 200 response", async () => {
    const response = await request(app).post("/api/users/logout");

    expect(response.status).toEqual(200);
  });
});
