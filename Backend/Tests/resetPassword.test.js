const request = require("supertest");

const Student = require("../Models/student");
const app = require("../server");
const { connect, closeDatabase, clearDatabase } = require("../testdb");

// setup mock database connection before each test case
// create a student before each test case
beforeEach(async (done) => {
  await connect();
  let student = Student({
    username: "student",
    password: "password",
    email: "email@email.com",
  });
  await student.save();
  done();
});

// drop the database after each test case
// close the mock database connection after each test
afterEach(async (done) => {
  await clearDatabase();
  done();
});

afterAll(async (done) => {
  await closeDatabase();
  done();
});

describe("User Reset Password Test", () => {
  // invalid username
  it("should fail due to username validation", async () => {
    const res = await request(app)
      .post("/api/authentication/forgotPassword")
      .send({
        username: "st",
        email: "email@email.com",
      });

    expect(res.statusCode).toEqual(400);
  });

  // empty email
  it("should fail due to empty email", async () => {
    const res = await request(app)
      .post("/api/authentication/forgotPassword")
      .send({
        username: "st",
      });

    expect(res.statusCode).toEqual(400);
  });

  // empty username
  it("should fail due to empty username", async () => {
    const res = await request(app)
      .post("/api/authentication/forgotPassword")
      .send({
        email: "email@email.com",
      });

    expect(res.statusCode).toEqual(400);
  });

  // success
  it("should succeed receive reset link", async () => {
    const res = await request(app)
      .post("/api/authentication/forgotPassword")
      .send({
        username: "student",
        email: "email@email.com",
      });

    expect(res.statusCode).toEqual(200);
  });
});
