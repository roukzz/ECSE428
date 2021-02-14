const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And, DataTable } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");

// ===== Step definitions for Update Tasks =====
// =============================================

// global vars
var tasks = {};

Given(
  "the following users with username {string} and password {string} is logged in in the system",
  async function (username, password) {
    const res = await request(app).post("/api/authentication/login").send({
      username,
      password,
    });
    this.authToken = res.text;
  }
);

Given(
  "the user with username {string} is not logged in",
  async function (username) {
    this.authToken = null;
  }
);

Then(
  "the user with username {string} has a task with title {string} and description {string}",
  async function (username, title, description) {
    const res = await request(app)
      .post("/api/student/addTaskToStudent")
      .send({
        username,
        title,
        description,
      })
      .set("auth-token", this.authToken);
    this.status = res.statusCode;
    tasks[title] = JSON.parse(res.text).pop()._id;
  }
);

When(
  "user with username {string} change the task with title {string} to new_title {string} and I change the description to new_description {string}",
  async function (username, title, newTitle, newDescription) {
    const res = await request(app)
      .post("/api/student/updateStudentTask")
      .send({
        username,
        title: newTitle,
        description: newDescription,
        taskId: tasks[title],
      })
      .set("auth-token", this.authToken);
    this.status = res.statusCode;
  }
);

Then(
  "I should receive a confirmation that my operation was successful with a status code of {string}",
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);

Then(
  "I should receive a confirmation that my operation was not successful with a status code of {string}",
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);
