const request = require('supertest');
const assert = require('assert');
const { Given, When, Then, And } = require('@cucumber/cucumber');

const app = require('../../server');
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require('../../testdb');


When(
  "a new user attempts to create an account with username {string} and password {string}", async function (username, password) {
    const res = await request(app).post("/api/authentication/register").send({
      username,
      password,
    });
    this.answer = res.statusCode;
    this.text = res.text;
  }
);


Then('the error message is error {string}', function (error) {
  // Write code here that turns the phrase above into concrete actions
  assert.strictEqual(this.text, error)
});


Then(
  "the user will receive an invalid status code {string}",
  async function (statusCode) {
    assert.strictEqual(this.answer, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
);
