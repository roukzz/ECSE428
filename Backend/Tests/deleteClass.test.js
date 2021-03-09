const request = require("supertest");
const mongoose = require("mongoose");
const Student = require("../Models/student");
const Class = require("../Models/Class");
const TimeSlot = require("../Models/timeslot");
const app = require("../server");
const { connect, closeDatabase, clearDatabase } = require("../testdb");
const { assert } = require("joi");

let authToken;
let id;

beforeEach(async (done) => {
  await connect();
  let student = Student({
    username: "student",
    password: "password",
    email: "email@email.com",
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

  const res2 = await request(app)
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

  id = JSON.parse(res2.text)._id;

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
describe("Delete Class", () => {
  //Normal task that should succeed
  it("Success deleting class", async () => {
    // login with invalid username but right password
    const res = await request(app)
      .post("/api/class/deleteClass")
      .send({
        username: "student",
        title: "ECSE 428",
        description: "Super Fun Class",
        startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
        endTime: new Date(Date.UTC(2021, 5, 7, 20, 0, 0)),
        location: "Montreal",
        classID: id,
      })
      .set("auth-token", authToken);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).length).toEqual(0);
    Student.findOne({ username: "student" }, function (err, docs) {
      if (err) {
        console.log(err);
        assert.fail();
      } else {
        if (docs) {
          expect(docs.classes.length).toEqual(0);
        }
      }
    });
  });

  it("Fails because of bad class id", async () => {
    // login with invalid username but right password
    const res = await request(app)
      .post("/api/class/updateClass")
      .send({
        username: "student",
        title: "ECSE 428",
        description: "Super Fun Class",
        startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
        endTime: new Date(Date.UTC(2021, 5, 7, 20, 0, 0)),
        location: "Montreal",
        classID: 0,
      })
      .set("auth-token", authToken);

    expect(res.statusCode).toEqual(400);
  });
});
