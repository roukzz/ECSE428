const request = require("supertest");

const Student = require("../Models/student");
const Event = require("../Models/event");

const app = require("../server");
let savedStudent;
let eventID;
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
  eventID = JSON.parse(res2.text)._id;
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

describe("Join New Event", () => {
  //Normal task that should succeed
  it("Should succeed to get join the event", async () => {
    const res = await request(app)
      .post("/api/event/joinEvent")
      .send({
        eventID: eventID,
        attendeeID: savedStudent._id,
      })
      .set("auth-token", authToken);
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).length).toEqual(1);
    expect(JSON.parse(res.text)[0].toString()).toEqual(
      savedStudent._id.toString()
    );
    Event.findOne({ _id: eventID }, function (err, docs) {
      if (err) {
        console.log(err);
        assert.fail();
      } else {
        expect(docs.attendeesIDs[0].toString()).toEqual(
          savedStudent._id.toString()
        );
      }
    });
  });
  it("Should fail to join the event due to invalid eventID", async () => {
    const res = await request(app)
      .post("/api/event/joinEvent")
      .send({
        eventID: 5,
        attendeeID: savedStudent._id,
      })
      .set("auth-token", authToken);
    expect(res.statusCode).toEqual(400);
  });
});
