const request = require('supertest');
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const app = require('../../server');
const Student = require('../../Models/student');
const { connect, clearDatabase, closeDatabase } = require('../../testdb');
const { func } = require('joi');

Given(
    "user with email {string} and password {string} is logged in",
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
    "the user has got a task with title {string} and description {string}",
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
    "the task has a slot with start time {string}, end time {string}, location {string} and description {string}",
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
    "user requests to delete a time slot for the task",
    async function () {
        const res = await request(app).post("/api/student/deleteTimeSlotTask").send({
            username: this.username,
            taskID: this.taskID,
            timeSID: this.timeSID
        }).set("auth-token", this.authToken);
        this.answer = JSON.parse(res.text);
    }
);

When(
    "user requests to delete an invalid time slot that does not belong to the task",
    async function () {
        const res = await request(app).post("/api/student/deleteTimeSlotTask").send({
            username: this.username,
            taskID: this.taskID,
            timeSID: new ObjectId
        }).set("auth-token", this.authToken);
        this.answer = res.text;
    }
);

Then(
    "a time slot is deleted from the task and the task has {string} time slots",
    async function (count) {
        assert.strictEqual(parseInt(count), this.answer.length);
        await clearDatabase();
        await closeDatabase();
    }
);

Then(
    "the system throws {string} error",
    async function (error) {
        assert.strictEqual(error, this.answer);
        await clearDatabase();
        await closeDatabase();
    }
);