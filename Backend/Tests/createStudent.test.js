const request = require("supertest");

const Student = require("../Models/student");
const app = require("../server");
const { connect, closeDatabase, clearDatabase } = require("../testdb");

// setup mock database connection before each test case
// create a student before each test case
beforeEach(async (done) => {
  await connect();
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

describe("User Register Test", () => {
  it("should succeed to register a student", async () => {
    const res = await request(app).post("/api/authentication/register").send({
      username: "student",
      password: "password",
    });

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).username).toEqual("student");
  });

  it("should fail register due to username validation", async () => {
    const res = await request(app).post("/api/authentication/register").send({
      username: "st",
      password: "password",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual(
      '"username" length must be at least 3 characters long'
    );
  });

  it("should fail register due to password validation", async () => {
    const res = await request(app).post("/api/authentication/register").send({
      username: "student",
      password: "pas",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual(
      '"password" length must be at least 6 characters long'
    );
  });

  it("should fail register due to username that has already been used", async () => {
    let student = Student({
      username: "student",
      password: "password",
    });
    await student.save();
    const res = await request(app).post("/api/authentication/register").send({
      username: "student",
      password: "password",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Student already exists");
  });
});
