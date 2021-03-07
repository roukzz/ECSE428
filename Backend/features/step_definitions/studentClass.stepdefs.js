const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And, DataTable } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");

var classes = {};

Given(
  "the user with an username {string} and password {string} is logged in",
  async function (username, password) {
    const res = await request(app).post("/api/authentication/login").send({
      username,
      password,
    });
    this.authToken = res.text;
  }
);

When(
  "the user attemps to create a class with title {string}, description {string}, startTime {string} and endTime {string} and I am username {string}",
  async function (title, description, startTime, endTime, username) {
    const res = await request(app)
      .post("/api/class/addNewClass")
      .send({
        username,
        title,
        description,
        startTime,
        endTime,
      })
      .set("auth-token", this.authToken);
    this.status = res.statusCode;
  }
);

Then(
  "the current user should receive a confirmation that the operation was successful with status code {string}",
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);

Given(
  "the user with username {string} logs out from his account",
  async function (username) {
    this.authToken = null;
  }
);

Then(
  "the current user should receive a confirmation that the operation was not successful with status code {string}",
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);

Given(
  "that we have the following class with title {string} and description {string} and startTime {string} and endTime {string} and I am username {string}",
  async function (title, description, startTime, endTime, username) {
    const res = await request(app)
      .post("/api/class/addNewClass")
      .send({
        username,
        title,
        description,
        startTime,
        endTime,
      })
      .set("auth-token", this.authToken);
    this.status = res.statusCode;
    classes[title] = JSON.parse(res.text)._id;
  }
);

When(
  "the user attemps to delete a class with title {string} and the user is {string}",
  async function (title, username) {
    const res = await request(app)
      .post("/api/class/deleteClass")
      .send({
        username,
        classID: classes[title],
      })
      .set("auth-token", this.authToken);
    this.status = res.statusCode;
  }
);
