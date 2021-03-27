const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");

When(
  "I request password reset with username {string} and email {string}",
  async function (username, email) {
    const res = await request(app)
      .post("/api/authentication/forgotPassword")
      .send({
        username,
        email,
      });
    this.status = res.statusCode;
  }
);

Then(
  "I should receive a confirmation that my operation of resetting password was successful with status code {string}",
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);

Then(
  "I should receive a confirmation that my operation of resetting password was not successful with status code {string}",
  async function (statusCode) {
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);
