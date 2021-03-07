const request = require('supertest');
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const app = require('../../server');
const Student = require('../../Models/student');
const { connect, clearDatabase, closeDatabase } = require('../../testdb');

Given(
    "user with username {string} and password {string} is logged in",
    async function (username, password) {
        await connect();
        let student = new Student({
            username,
            password
        });
        await student.save();
        const res = await request(app).post("/api/authentication/login").send({
            username,
            password
        });
        if(res.statusCode !== 200) return false;
        this.username = username;
        this.authToken = res.text;
    }
);

Given(
    "the user has a task with title {string} and description {string}",
    async function (title, description) {
        const res = await request(app).post("/api/student/addTaskToStudent").send({
            username: this.username,
            title,
            description
        }).set("auth-token", this.authToken);
        if(res.statusCode !== 200) return false;
        this.taskID = JSON.parse(res.text).pop()._id;
    }
);

Given(
    "the task has a time slot with start time {string}, end time {string}, location {string} and description {string}",
    async function (startTime, endTime, location, description) {
        const res = await request(app).post("/api/student/addTimeslotToTask").send({
            username: this.username,
            taskID: this.taskID,
            timeslot: {
                startTime,
                endTime,
                location,
                description
            }
        }).set("auth-token", this.authToken);
        this.timeSID = JSON.parse(res.text)[0]._id;
    }
);

When(
    "user requests to update their time slot with start time {string}, end time {string}, location {string}, and description {string}",
    async function(startTime, endTime, location, description) {
        const res = await request(app).post("/api/student/updateTimeSlotTask").send({
            username: this.username,
            taskID: this.taskID,
            timeSID: this.timeSID,
            startTime,
            endTime,
            location,
            description
        }).set("auth-token", this.authToken);
        this.answer = JSON.parse(res.text)[0];
    }
);

When(
    "user requests to update a time slot for a non-existing task with start time {string}, end time {string}, location {string}, and description {string}",
    async function (startTime, endTime, location, description) {
        const res = await request(app).post("/api/student/updateTimeSlotTask").send({
            username: this.username,
            taskID: new ObjectId,
            timeSID: new ObjectId,
            startTime,
            endTime,
            location,
            description
        }).set("auth-token", this.authToken);
        this.answer = res.text;
    }
);

Then(
    "the time slot is updated to {string}, {string}, {string}, and {string}",
    async function (start, end, location, description) {
        startTime = new Date(start).toISOString();
        endTime = new Date(end).toISOString();
        assert.strictEqual(startTime, this.answer.startTime);
        assert.strictEqual(endTime, this.answer.endTime);
        assert.strictEqual(location, this.answer.location);
        assert.strictEqual(description, this.answer.description);
        await clearDatabase();
        await closeDatabase();
    }
);

Then(
    "the system throws {string}",
    async function (error) {
        assert.strictEqual(error, this.answer);
        await clearDatabase();
        await closeDatabase();
    }
);