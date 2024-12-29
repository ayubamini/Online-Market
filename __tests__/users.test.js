const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server/server");

afterAll(async () => {
  // Disconnect from database after running tests
  await mongoose.connection.close();
});

describe("User API", () => {
  let userId;

  test("should create a new user", async () => {
    const newUser = {
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      password: "testSecret123",
      customer: {
        address: {
          address1: "456 Elm St",
          city: "Los Angeles",
          state: "CA",
          zip: "90001",
        },
      },
    };

    const response = await request(app).post("/api/users").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.firstName).toBe("Test");
    expect(response.body.lastName).toBe("User");
    expect(response.body.email).toBe("testuser@example.com");

    userId = response.body._id;
  });

  test("should get all users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("should get a single user by ID", async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(userId);
  });

  
  test("should update a user", async () => {
    const response = await request(app)
      .patch(`/api/users/${userId}`)
      .send({ firstName: "Updated Test User" });
    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe("Updated Test User");
  });

  test("should delete a user", async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User is removed successfully");
  });
  
});
