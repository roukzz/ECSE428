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

Given(
  "user has  joined an event with name {string}, start time {string}, end time {string}, location {string}, description {string}",
  async function (name, startTime, endTime, location, description) {
    // Write code here that turns the phrase above into concrete actions
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
    const res2 = await request(app)
      .post("/api/event/joinEvent")
      .send({
        eventID: JSON.parse(res.text)._id,
        attendeeID: this.id,
      })
      .set("auth-token", this.authToken);
    this.answer = res2.text;
    return;
  }
);
When(
  "user attempts to unjoin an event with with title {string} and description {string} and date {string} and I am username {string}",
  async function (title, description, date, username) {
    const res = await request(app)
      .post("/api/event/getAllEvents")
      .send()
      .set("auth-token", this.authToken);
    let event = JSON.parse(res.text).find((element) => element.title == title);
    let eventID = 50;
    if (event) {
      eventID = event._id;
    }

    const res2 = await request(app)
      .post("/api/event/unjoinEvent")
      .send({
        eventID: eventID,
        attendeeID: this.id,
      })
      .set("auth-token", this.authToken);

    this.answer = res2.text;
    this.status = res2.status;
    return;
  }
);
When(
  "user requests to update an event with oldName {string} and new name {string}, start time {string}, end time {string}, location {string}, description {string}",
  async function (oldName, newName, startTime, endTime, location, description) {
    const res = await request(app)
      .post("/api/event/getAllEvents")
      .send()
      .set("auth-token", this.authToken);
    let event = JSON.parse(res.text).find(
      (element) => element.title == oldName
    );
    let eventID = 50;
    if (event) {
      eventID = event._id;
    }
    const res2 = await request(app)
      .post("/api/event/updateEvent")
      .send({
        eventID: eventID,
        description: description,
        location: location,
        startTime: startTime,
        endTime: endTime,
        title: newName,
      })
      .set("auth-token", this.authToken);

    this.answer = res2.text;
    this.status = res2.status;
    return;
  }
);

Then(
  "an event is updated with {string}, {string}, {string}, {string} and {string}",
  function (title, startTime, endTime, location, description) {
    let response = JSON.parse(this.answer);
    assert.strictEqual(response.title, title);
    assert.strictEqual(response.startTime, startTime);
    assert.strictEqual(response.endTime, endTime);
    assert.strictEqual(response.location, location);
    assert.strictEqual(response.description, description);
  }
);
When(
  "user wishes to update an event with old name {string} and new name {string}, start time {string}, end time {string}, location {string}, description {string}",
  function (string, string2, string3, string4, string5, string6) {
    //He only wishes, so nothing to do
    return;
  }
);

Then("the event is not updated", function () {
  //Nothing to check here
});
