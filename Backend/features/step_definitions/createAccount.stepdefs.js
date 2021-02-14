const request = require('supertest');
const assert = require('assert');
const { Given, When, Then, And } = require('@cucumber/cucumber');

const app = require('../../server');
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require('../../testdb');


Given(
  "the following users with username {string} and password {string} are registered in the system",
  async function (username, password) {
    await connect();
    let student = Student({
      username,
      password,
    });
    await student.save();
  }
);



When(
  "a new user attempts to create an account with username {string} and password {string}",
  async function (username, password) {
    const res = await request(app)
      .post("/api/authentification/register)
      .send({
        username,
        password
      })
      .set("auth-token", this.authToken);
    this.answer = res.statusCode;
    this.error = res.text;
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


Then(
  "the user will receive a success status code {string} with error message {string}",
  async function (statusCode, error) {
    assert.strictEqual(this.answer, parseInt(statusCode));
      assert.strictEqual(this.error, error);
    await clearDatabase();
    await closeDatabase();
  }
);
