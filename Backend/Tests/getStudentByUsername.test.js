const request = require("supertest");

const Student = require("../Models/student");
const app = require("../server");
const { connect, closeDatabase, clearDatabase } = require("../testdb");
let authToken;

beforeEach(async (done) => {
  await connect();
  let student = Student({
    username: "student",
    password: "password",
    tasks: {
      title: "TitleTask",
      description: "DescriptionTask",
    },
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

describe("Get student by username test", () => {
  //Normal task that should succeed
  it("should succeed to get the tasks", async () => {
    // login with invalid username but right password
    const res = await request(app)
      .post("/api/student/getStudentByUsername")
      .send({
        username: "student",
      })
      .set("auth-token", authToken);
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).username).toEqual("student");
  });

  //wrong username

  it("should fail to get the tasks", async () => {
    // login with invalid username but right password
    const res = await request(app)
      .post("/api/student/getStudentByUsername")
      .send({
        username: "st",
      })
      .set("auth-token", authToken);

    expect(res.statusCode).toEqual(400);
  });
});
