const request = require("supertest");
const testMongoDB = require("../../test_helper/in_memory_mongodb_setup");
const app = require("../../app");
const User = require("../../models/user.model");

beforeAll(testMongoDB.setup);
afterAll(testMongoDB.teardown);

describe("POST /users/login", () => {
  it("should return error if user does not exist", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ username: "Sabrina", password: "12345678" });

    expect(response.status).toEqual(422);
    expect(response.body).toEqual({ message: "Invalid email or password." });
  });

  describe("on success", () => {
    const username = "newuser-success";
    const password = "12345678";

    const user = new User({ username, password });

    beforeEach(async () => {
      await user.save();
    });

    it("should return 200 response with JWT token", async () => {
      const response = await request(app)
        .post("/api/users/login")
        .send({ username: "newuser-success", password: "12345678" });

      expect(response.status).toEqual(200);
      expect(response.body.message).toEqual("Login success!");
    });

    describe("JWT token generation", () => {
      it("JWT token is generated and verified", () => {
        const token = user.generateJWT();
        expect(user.verifyJWT(token)).toBeTruthy();
      });
    });
  });

  describe("on failure", () => {
    const username = "newuser-failure";
    const password = "12345678";

    const user = new User({ username, password });

    beforeEach(async () => {
      await user.save();
    });

    it("should return 422 response if password is incorrect", async () => {
      const response = await request(app)
        .post("/api/users/login")
        .send({ username: "newuser-failure", password: "incorrect-password" });

      expect(response.status).toEqual(422);
      expect(response.body).toEqual({ message: "Invalid email or password." });
    });

    describe("JWT token generation", () => {
      it("JWT token cannot be verified", () => {
        const token = "invalid-token";
        expect(user.verifyJWT(token)).toBeFalsy();
      });
    });
  });
});
