const request = require('supertest');
const assert = require('assert');
const { Given, When, Then, And } = require('@cucumber/cucumber');

const app = require('../../server');
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require('../../testdb');

Given('user with email {string} with password {string}', async function (username, password) {
    await connect();
    let student = Student({
        username,
        password
    });
    await student.save();
});

When('user attempts to login into the system with email {string} and password {string}', async function (username, password) {
    const res = await request(app).post('/api/authentication/login').send({
        username,
        password
    });
    this.answer = res.statusCode;
    this.error = res.text;
});

Then('the user will receive a status code {string}', async function (statusCode) {
    assert.strictEqual(this.answer, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
});

Then('an error for password {string} message is displayed', async function (error) {
    assert.strictEqual(this.error, error);
    await clearDatabase();
    await closeDatabase();
});

Then('an error for email {string} message is displayed', async function (error) {
    assert.strictEqual(this.error, error);
    await clearDatabase();
    await closeDatabase();
});

Then('a password validation error {string} message is displayed', async function (error) {
    assert.strictEqual(this.error, error);
    await clearDatabase();
    await closeDatabase();
});

Then('an email validation error {string} message is displayed', async function (error) {
    assert.strictEqual(this.error, error);
    await clearDatabase();
    await closeDatabase();
});