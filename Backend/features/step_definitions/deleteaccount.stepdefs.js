const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");

Given(
  "the following users with username {string} and password {string} are registered in the system:",
  async function (username, password, callback) {
    console.log(username, password);
    await connect();
    let student = Student({
      username,
      password,
    });
    await student.save();
  }
);

Given(
  "user with an username {string} with a password {string} is logged in",
  async function (username, password) {
    const res = await request(app).post("/api/authentication/login").send({
      username,
      password,
    });
    this.authToken = res.text;

    console.log(this.authToken);
  }
);

When(
  "user attempts to delete his account with username {string}",
  async function (username) {
    const res = await request(app)
      .delete("/api/student/deleteStudentAccount")
      .send({
        username,
      })
      .set("auth-token", this.authToken);
    this.answer = res.statusCode;
  }
);

Then(
  "the user will receive a success status code {string}",
  async function (statusCode) {
    assert.strictEqual(this.answer, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);
