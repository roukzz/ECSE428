const request = require("supertest");

const Student = require("../Models/student");
const timeslot = require("../Models/timeslot");
const app = require("../server");
const {
  connect,
  closeDatabase,
  clearDatabase
} = require("../testdb");
let authToken;
let taskID;
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

describe("Add Time Slot to a task Login Test", () => {
  //Normal task that should succeed
  it("should succeed to add time slot to a task", async () => {
    const res1 = await request(app).post("/api/student/addTaskToStudent")
        .send({
          username: "student",
          title: "TaskTitle",
          description: "TaskDescription",
        }).set("auth-token", authToken);;

    taskID = res1.body[0]._id.toString();
    const res = await request(app)
      .post("/api/student/addTimeslotToTask")
      .send({
        username: "student",
        taskID: taskID,
        timeslot: {
          startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
          endTime: new Date(Date.UTC(2021, 3, 1, 16, 0, 0)),
          location: "location",
        },
      })
      .set("auth-token", authToken);
    expect(res.statusCode).toEqual(200);
    Student.findOne({
      username: "student"
    }, function(err, docs) {
      if (err) {
        console.log(err);
        assert.fail();
      } else {
        if (docs) {
          expect(docs.tasks[0].timeslots[0].location).toEqual("location");
        }
      }
    });
  });

  it("Failure", async () => {
    // give the wrong username
    const res = await request(app)
        .post("/api/class/addTimeSlotToClass")
        .send({
          username: "stud",
          taskID: taskID,
          timeslot : {
            startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
            endTime: new Date(Date.UTC(2021, 3, 1, 16, 0, 0)),
            location: "Montreal",
          },
        })
        .set("auth-token", authToken);
    expect(res.statusCode).toEqual(400);
  });
});
