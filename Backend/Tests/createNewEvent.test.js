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
  it("Should succeed to create a new Event", async () => {
    const res = await request(app)
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

    expect(res.statusCode).toEqual(200);
    Event.findOne({ location: "Montreal" }, function (err, docs) {
      if (err) {
        console.log(err);
        assert.fail();
      } else {
        expect(JSON.stringify(docs.creatorID)).toEqual(
          JSON.stringify(savedStudent._id)
        );
        expect(docs.title).toEqual("New Event!!!");
        expect(docs.description).toEqual("Gonna be fun!");
      }
    });
  });
  it("Should fail to create a new event because of no creatorID", async () => {
    const res = await request(app)
      .post("/api/event/createNewEvent")
      .send({
        title: "New Event!!!",
        description: "Gonna be fun!",
        startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
        endTime: new Date(Date.UTC(2021, 5, 7, 20, 0, 0)),
        location: "Montreal",
      })
      .set("auth-token", authToken);

    expect(res.statusCode).toEqual(400);
  });
  it("Should fail to create a new event because of overlapping events by creator", async () => {
    const res = await request(app)
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

    const res2 = await request(app)
      .post("/api/event/createNewEvent")
      .send({
        creatorID: savedStudent._id,
        title: "Other Event",
        description: "Gonna be fun!",
        startTime: new Date(Date.UTC(2021, 2, 1, 14, 30, 0)),
        endTime: new Date(Date.UTC(2021, 6, 7, 20, 0, 0)),
        location: "Montreal",
      })
      .set("auth-token", authToken);

    expect(res.statusCode).toEqual(200);
    console.log(res2.text);
    expect(res2.statusCode).toEqual(400);
  });
});
