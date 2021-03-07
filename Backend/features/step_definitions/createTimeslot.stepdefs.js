const request = require('supertest');
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const app = require('../../server');
const Student = require('../../Models/student');
const Task = require('../../Models/task');
const { connect, clearDatabase, closeDatabase } = require('../../testdb');

Given(
    "the user with email {string} and password {string} is logged in",
    async function (username, password) {
        await connect();
        let student = Student({
            username,
            password
        });
        await student.save();
        const res = await request(app).post("/api/authentication/login").send({
            username,
            password
        });
        if(res.statusCode !== 200) return false;
        this.student = username;
        this.authToken = res.text;
    }
);

Given(
    "the user creates a task with title {string} and description {string}",
    async function (title, description) {
        const res = await request(app).post("/api/student/addTaskToStudent").send({
            username: this.student,
            title,
            description
        }).set("auth-token", this.authToken);
        if(res.statusCode !== 200) return false;
        this.taskID = JSON.parse(res.text).pop()._id;
    }
);

When(
    "user requests to create a time slot for their task with start time {string}, end time {string}, and location {string}",
    async function (startTime, endTime, location) {
        const res = await request(app).post("/api/student/addTimeslotToTask").send({
            username: this.student,
            taskID: this.taskID,
            timeslot: {
                startTime,
                endTime,
                location
            },
        }).set("auth-token", this.authToken);
        this.answer = JSON.parse(res.text);
    }
);

When(
    "user requests to create a time slot for a non-existing task with start time {string}, end time {string}, and location {string}",
    async function (startTime, endTime, location) {
        const res = await request(app).post("/api/student/addTimeslotToTask").send({
            username: this.student,
            taskID: new ObjectId,
            timeslot: {
                startTime,
                endTime,
                location
            },
        }).set("auth-token", this.authToken);
        this.answer = res.text;
    }
);

Then(
    "the task has a new timeslot with start time {string}, end time {string} and location {string}",
    async function (start, end, location) {
        startTime = new Date(start).toISOString();
        endTime = new Date(end).toISOString();
        assert.strictEqual(startTime, this.answer[0].startTime);
        assert.strictEqual(endTime, this.answer[0].endTime);
        assert.strictEqual(location, this.answer[0].location);
        await clearDatabase();
        await closeDatabase();
    }
);

Then(
    "the system throws an {string} error",
    async function (error) {
        assert.strictEqual(error, this.answer);
        await clearDatabase();
        await closeDatabase();
    }
);