const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And, DataTable } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const Event = require("../../Models/event");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");

When(
  "user creates an event with name {string}, start time {string}, end time {string}, location {string}, description {string}",
  async function (name, startTime, endTime, location, description) {
    const res = await request(app)
      .post("/api/event/createNewEvent")
      .send({
        title: name,
        description: description,
        location: location,
        creatorID: this.id,
        startTime: startTime,
        endTime: endTime,
      })
      .set("auth-token", this.authToken);
    this.answer = res.text;

    return;
  }
);

When(
  "user wants to create an event with name {string}, start time {string}, end time {string}, location {string}, description {string}",
  async function (name, startTime, endTime, location, description) {
    //He only wants to do it, so there is nothing to send to the backend.
    return;
  }
);
Given("the application is running", function () {
  // The application is ran when the tests start
  return;
});

Then("no event is created", function () {
  // Nothing to check if nothing is created
  return;
});
When("user does not confirm the request", function () {
  //Nothing to check here
  return;
});

Then(
  "an event is created with  {string}, {string}, {string}, {string} and {string}",
  function (title, startTime, endTime, location, description) {
    let response = JSON.parse(this.answer);
    assert.strictEqual(response.title, title);
    assert.strictEqual(response.startTime, startTime);
    assert.strictEqual(response.endTime, endTime);
    assert.strictEqual(response.location, location);
    assert.strictEqual(response.description, description);
  }
);
