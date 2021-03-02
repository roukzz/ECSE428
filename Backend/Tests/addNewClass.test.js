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
describe("Add Class to Student ", () => {
  //Normal task that should succeed
  it("Success no Timeslots", async () => {
    // login with invalid username but right password
    const res = await request(app)
      .post("/api/class/addNewClass")
      .send({
        username: "student",
        title: "ECSE 428",
        description: "Software Engineering Practice",
        startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
        endTime: new Date(Date.UTC(2021, 5, 7, 20, 0, 0)),
        location: "Montreal",
      })
      .set("auth-token", authToken);
    console.log(res.text);
    expect(res.statusCode).toEqual(200);
  });

  it("Success with Timeslots", async () => {
    // login with invalid username but right password
    const res = await request(app)
      .post("/api/class/addNewClass")
      .send({
        username: "student",
        title: "ECSE 428",
        description: "Software Engineering Practice",
        startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
        endTime: new Date(Date.UTC(2021, 5, 7, 20, 0, 0)),
        location: "Montreal",
        timeslots: [
          {
            startTime: Date.UTC(2012, 1, 1, 10, 30),
            endTime: Date.UTC(2012, 1, 1, 14, 30),
          },
        ],
      })
      .set("auth-token", authToken);
    console.log(res.text);
    expect(res.statusCode).toEqual(200);
  });
});
