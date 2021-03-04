const request = require("supertest");

const Student = require("../Models/student");

const Reminder = require("../Models/reminder");

const app = require("../server");
const { connect, closeDatabase, clearDatabase } = require("../testdb");

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

  let reminder = Reminder({
    title: "reminderTitle",
    description: "reminderDescription",
    reminderDate :  '2021-12-12 12:11:11'
  });

  await reminder.save();
  student.reminders.push(reminder);
  await student.save();
  this.student = student;
  this.reminder = reminder;
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

describe("Update reminder Test", () => {
  it("should update a reminder of an authenticated user", async () => {
    const res1 = await request(app).post("/api/authentication/login").send({
      username: "student",
      password: "password",
    });
    const res2 = await request(app)
      .post("/api/reminder/updateStudentReminder")
      .set("auth-token", res1.headers["auth-token"])
      .send({
        username: "student",
        reminderId: this.reminder._id.toString(),
        title: "New reminder Title",
        description: "New reminder Description",
        reminderDate :  '2025-12-12 12:11:11'
      });
    expect(res2.statusCode).toEqual(200);
    expect(res2.body).not.toEqual(this.student.reminders);
  });

  it("should not update a reminder of an unauthenticated user", async () => {
    const res = await request(app).post("/api/reminder/updateStudentReminder").send({
      username: "student",
      reminderId: this.reminder._id.toString(),
      title: "New reminder Title",
      description: "New reminder Description",
      reminderDate :  '2025-12-12 12:11:11'
    });
    expect(res.statusCode).toEqual(401);
    expect(res.text).toEqual("Access Denied");
  });
});
