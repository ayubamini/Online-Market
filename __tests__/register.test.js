const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server/server");

afterAll(async () => {
  // Disconnect from database after running tests
  await mongoose.connection.close();
});

describe("User Sign Up controller test", () => {
  let userId;
  test("should sign up a new customer", async () => {
    const signUpUserInfo = {
      firstName: "myUser",
      lastName: "Cust",
      email: "myUser@example.com",
      phoneNumber: "+1(123)456-7789",
      password: "customerSecret123",
    };

    const response = await request(app).post("/api/signup").send(signUpUserInfo);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User added successfully!");
    expect(response.body.data.email).toBe("myuser@example.com");

    userId = response.body.data.userId;
  });

  test("should delete a customer", async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User is removed successfully");
  });
});
