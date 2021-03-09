const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And, DataTable } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");
var reminders = {};

Given(
  "the user with username {string} and password {string} is logged in",
  async function (username, password) {
    const res = await request(app).post("/api/authentication/login").send({
      username,
      password,
    });
    this.authToken = res.text;
  }
);

When(
  "the user attempts to create a reminder with rem_title {string} and rem_content {string} and rem_date {string} and I am username {string}",
  async function (rem_title, rem_content, rem_date, username) {
    const res = await request(app)
      .post("/api/reminder/addReminderToStudent")
      .send({
        username,
        title: rem_title,
        description: rem_content,
        reminderDate: rem_date,
      })
      .set("auth-token", this.authToken);
    this.status = res.statusCode;
  }
);

Then(
  "I should receive a confirmation that my operation was very successful with status code {string}",
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);

Given(
  "user with username {string} is currently not logged in",
  async function (username) {
    this.authToken = null;
  }
);

Then(
  "I should receive a confirmation that my operation was not very successful with status code {string}",
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);

Given(
  "that we have the following reminder with rem_title {string} and rem_content {string} and rem_date {string} and I am username {string}",
  async function (rem_title, rem_content, rem_date, username) {
    const res = await request(app)
      .post("/api/reminder/addReminderToStudent")
      .send({
        username,
        title: rem_title,
        description: rem_content,
        reminderDate: rem_date,
      })
      .set("auth-token", this.authToken);
    this.status = res.statusCode;
    reminders[rem_title] = JSON.parse(res.text).pop()._id;
  }
);

When(
  "user changes reminder to new reminder with rem_title {string} and rem_content {string} and rem_date {string} and I am username {string}",
  async function (rem_title, rem_content, rem_date, username) {
    const res = await request(app)
      .post("/api/reminder/updateStudentReminder")
      .send({
        username,
        reminderId: reminders[rem_title],
        title: rem_title,
        description: rem_content,
        reminderDate: rem_date,
      })
      .set("auth-token", this.authToken);
    this.status = res.statusCode;
    // reminders[rem_title] = JSON.parse(res.text).pop()._id;
  }
);

When(
  "the user {string} attempts to delete the reminder with title {string}",
  async function (username, rem_title) {
    let id = reminders[rem_title];
    if (!id) {
      id = 0;
    }
    const res = await request(app)
      .post("/api/reminder/deleteStudentReminder")
      .send({
        username,
        reminderId: id,
      })
      .set("auth-token", this.authToken);
    this.status = res.statusCode;
  }
);
