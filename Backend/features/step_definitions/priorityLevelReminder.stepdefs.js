const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And, DataTable } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");
var reminders = {};

Given(

  "username {string} and password {string} is logged in the system mySchedule",
  async function (username, password) {
    const res = await request(app).post("/api/authentication/login").send({
      username,
      password,
    });
    this.authToken = res.text;
  }
);

When(
  "the user attempts to create a reminder with rem_title {string} and rem_content {string} and rem_date {string} and priority_level {string} and I am username {string}",
  async function (rem_title, rem_content, rem_date, priority_level,username) {
    const res = await request(app)
      .post("/api/reminder/addReminderToStudent")
      .send({
        username,
        title: rem_title,
        description: rem_content,
        reminderDate: rem_date,
        priority:priority_level
      })
      .set("auth-token", this.authToken);
    this.status = res.statusCode;
  }
);

Then(
  "I should receive a confirmation that my operation was very successful with status code {string} for create a reminder with priority level" ,
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);

Given(
  "the user with username {string} is currently not logged in the system",
  async function (username) {
    this.authToken = null;
  }
);



Then(
  "I should receive a confirmation that my operation was not successful with status code {string} for creation a reminder with priority level",
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);
