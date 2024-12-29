const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server/server");

afterAll(async () => {
  // Disconnect from database after running tests
  await mongoose.connection.close();
});

describe("User Sign In controller tests", () => {
  let userId;

  test("should sign in registered user", async () => {
    // real username and password
    const lognInfo = {
      email: "testuser@example.com",
      password: "testSecret123"
    };

    const response = await request(app).post("/api/signin").send(lognInfo);
    expect(response.status).toBe(200);
    expect(response.body.user.firstName).toBe("Test");
    expect(response.body.user.lastName).toBe("User");
    expect(response.body.message).toBe("Authentication successful");
  });

  test("should get Invalid email", async () => {
    const lognInfo = {
      email: "wrong-email",
      password: "testSecret123"
    };

    const response = await request(app).post("/api/signin").send(lognInfo);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email address");
  });

  test("should get Invalid password message", async () => {
    const lognInfo = {
      email: "testuser@example.com",
      password: "wrong-password"
    };

    const response = await request(app).post("/api/signin").send(lognInfo);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Email or password is not matched");
  });
});
