const request = require("supertest");

const Student = require("../Models/student");
const app = require("../server");
const { connect, closeDatabase, clearDatabase } = require("../testdb");
let authToken;
// setup mock database connection before each test case
// create a student before each test case
beforeEach(async (done) => {
  await connect();
  let student = Student({
    username: "student",
    password: "password",
  });
  await student.save();

  const res = await request(app).post("/api/authentication/login").send({
    username: "student",
    password: "password",
  });
  authToken = res.text;
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

describe("Add Task Login Test", () => {
  //Normal task that should succeed
  it("should succeed to add task", async () => {
    // login with invalid username but right password
    const res = await request(app)
      .post("/api/student/addTaskToStudent")
      .send({
        username: "student",
        title: "TaskTitle",
        description: "TaskDescription",
      })
      .set("auth-token", authToken);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).pop().title).toEqual("TaskTitle");
  });

  //Empty description it should succeed

  it("should succeed to add task with empty description", async () => {
    // login with invalid username but right password
    const res = await request(app)
      .post("/api/student/addTaskToStudent")
      .send({
        username: "student",
        title: "TaskTitle",
        description: "",
      })
      .set("auth-token", authToken);

    expect(res.statusCode).toEqual(200);
  });

  // Wrong username- Should fail
  it("should fail to add task because of invalid username", async () => {
    // login with invalid username but right password
    try {
      const res = await request(app)
        .post("/api/student/addTaskToStudent")
        .send({
          username: "st",
          title: "TaskTitle",
          description: "TaskDescription",
        })
        .set("auth-token", authToken);
    } catch (error) {}
  });
});
