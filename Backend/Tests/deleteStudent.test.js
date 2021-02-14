const request = require("supertest");

const Student = require("../Models/student");
const Task = require("../Models/task");
const app = require("../server");
const { connect, closeDatabase, clearDatabase } = require("../testdb");

// setup mock database connection before each test case
// create a student before each test case
beforeEach(async (done) => {
  await connect();
  let student = Student({
    username: "student",
    password: "password",
  });
  await student.save();
  this.student = student;
  done();
});

afterEach(async (done) => {
  await clearDatabase();
  done();
});

afterAll(async (done) => {
  await closeDatabase();
  done();
});

describe("Delete Account", () => {
  it("should delete an account when authenticated", async () => {
    const res1 = await request(app).post("/api/authentication/login").send({
      username: "student",
      password: "password",
    });
    const res2 = await request(app)
      .post("/api/student/deleteStudentAccount")
      .set("auth-token", res1.headers["auth-token"])
      .send({
        username: "student",
        taskId: this.task._id.toString(),
      });
    expect(res2.statusCode).toEqual(200);
  });

  it("should not delete a task of an unauthenticated user", async () => {
    const res = await request(app).post("/api/student/deleteStudentAccount").send({
      username: "student",
    });
    expect(res.statusCode).toEqual(401);
  });
});
