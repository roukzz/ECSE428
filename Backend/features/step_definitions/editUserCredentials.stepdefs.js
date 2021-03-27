const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");

Given(
    "the following user {string}, {string} and password {string} is registered in the system",
    async function (username, email, password) {
        await connect();
        const student = new Student({
            username,
            password,
            email
        });
        this.student = student;
        student.save();
    }
);

Given(
    "the user is logged in",
    async function () {
        const res = await request(app).post("/api/authentication/login").send({
            username: this.student.username,
            password: this.student.password
        });
        this.authToken = res.text;
    }
);

Given(
    "the user wants to update their password to {string} and their email to {string}",
    async function (newPassword, newEmail) {
        const res = await request(app).post("/api/student/editStudentInfo").send({
            username: this.student.username,
            newPassword,
            newEmail
        }).set("auth-token", this.authToken);
        this.answer = res;
    }
);

Then(
    "the system updates the credentials and returns a {string} message",
    async function (message) {
        assert.strictEqual(this.answer.statusCode, 200);
        assert.strictEqual(this.answer.text, message);
        await closeDatabase();
    }
);

Then(
    "the system does not update the credentials due to {string} error",
    async function (error) {
        assert.strictEqual(this.answer.statusCode, 400);
        assert.strictEqual(this.answer.text, error);
        await closeDatabase();
    }
);