const request = require("supertest");

const Student = require("../Models/student");
const Reminder = require("../Models/reminder");
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

describe("Add reminder with  priority Test", () => {

  it("should succeed to add reminder with Low priority", async () => {
    // login with invalid username but right password
    const res = await request(app)
      .post("/api/reminder/addReminderToStudent")
      .send({
        username: "student",
        title: "reminderTitle",
        description: "reminderDescription",
        reminderDate :  '2021-12-12 12:11:11',
        priority: 'Low'
      })
      .set("auth-token", authToken);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).pop().priority).toEqual("Low");
  });

  it("should succeed to add reminder with Medium priority", async () => {
    // login with invalid username but right password
    const res = await request(app)
      .post("/api/reminder/addReminderToStudent")
      .send({
        username: "student",
        title: "reminderTitle",
        description: "reminderDescription",
        reminderDate :  '2021-12-12 12:11:11',
        priority: 'Medium'
      })
      .set("auth-token", authToken);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).pop().priority).toEqual("Medium");
  });


  it("should succeed to add reminder with High priority", async () => {
    // login with invalid username but right password
    const res = await request(app)
      .post("/api/reminder/addReminderToStudent")
      .send({
        username: "student",
        title: "reminderTitle",
        description: "reminderDescription",
        reminderDate :  '2021-12-12 12:11:11',
        priority: 'High'
      })
      .set("auth-token", authToken);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).pop().priority).toEqual("High");
  });

});
