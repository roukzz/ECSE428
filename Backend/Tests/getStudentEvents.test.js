const request = require("supertest");

const Student = require("../Models/student");
const Event = require("../Models/event");

const app = require("../server");
let savedStudent;
const { connect, closeDatabase, clearDatabase } = require("../testdb");
let authToken;

// setup mock database connection before each test case
// create a student before each test case
beforeEach(async (done) => {
  await connect();
  let student = Student({
    username: "student",
    password: "password",
    email: "email@email.com",
  });
  savedStudent = await student.save();
  const res = await request(app).post("/api/authentication/login").send({
    username: "student",
    password: "password",
  });

  authToken = res.text;
  const res2 = await request(app)
    .post("/api/event/createNewEvent")
    .send({
      creatorID: savedStudent._id,
      title: "New Event!!!",
      description: "Gonna be fun!",
      startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
      endTime: new Date(Date.UTC(2021, 5, 7, 20, 0, 0)),
      location: "Montreal",
    })
    .set("auth-token", authToken);

  const res3 = await request(app)
    .post("/api/event/createNewEvent")
    .send({
      creatorID: 5,
      title: "Other Event",
      description: "Gonna be fun!",
      startTime: new Date(Date.UTC(2021, 1, 1, 14, 30, 0)),
      endTime: new Date(Date.UTC(2021, 2, 7, 20, 0, 0)),
      location: "Montreal",
    })
    .set("auth-token", authToken);
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

describe("Create New Event", () => {
  //Normal task that should succeed
  it("Should succeed to get the event", async () => {
    const res = await request(app)
      .post("/api/event/getStudentEvents")
      .send({
        creatorID: savedStudent._id,
      })
      .set("auth-token", authToken);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).length).toEqual(1);
  });
});
