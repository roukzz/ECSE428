const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And, DataTable } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");

// ===== Step definitions for Create Tasks =====
// ===============================================

Given(
  "the following users with username {string} and password {string} is logged in",
  async function (username, password) {
    const res = await request(app).post("/api/authentication/login").send({
      username,
      password,
    });
    this.authToken = res.text;
  }
);

When(
  "I create a task with title {string} and description {string} and I am username {string}",
  async function (title, description, username) {
    const res = await request(app)
      .post("/api/student/addTaskToStudent")
      .send({
        username,
        title,
        description,
      })
      .set("auth-token", this.authToken);
    this.status = res.statusCode;
  }
);

Given(
  "user with username {string} is not logged in",
  async function (username) {
    this.authToken = null;
  }
);

Then(
  "I should receive a confirmation that my operation was successful with status code {string}",
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);

Then(
  "I should receive a confirmation that my operation was not successful with status code {string}",
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);
