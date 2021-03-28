const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And } = require("@cucumber/cucumber");
const mongoose = require("mongoose");

const app = require("../../server");
const Student = require("../../Models/student");
const Event = require("../../Models/event");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");

Given(
    "there is an event in the system with start time {string}, end time {string}, title {string}, description {string}, location {string}",
    async function(startTime, endTime, title, description, location) {
        await connect();
        const event = new Event({
            startTime,
            endTime,
            title,
            description,
            location,
            creatorID: this.student._id
        });
        await event.save();
        this.event = event;
    }
);

Given(
    "the user asks to join the event {string}",
    async function(title) {
        const res = await request(app).post("/api/event/joinEvent").send({
            eventID: this.event.title === title ? this.event._id : null
        }).set("auth-token", this.authToken);
        this.answer = res;
    }
);

Then(
    "the user successfully joins the event",
    async function() {
        assert.strictEqual(this.answer.statusCode, 200);
        await closeDatabase();
    }
);

Then(
    "the user fails to join the event since the event does not exist",
    async function() {
        assert.strictEqual(this.answer.statusCode, 400);
        await closeDatabase();
    }
);