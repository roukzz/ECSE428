const supertest = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const { Given, When, Then, And } = require('@cucumber/cucumber');

const app = require('../../server');
const Student = require("../../Models/student");
const { mongoUri } = require('../../globalConfig.json')

// connect to mock test server
mongoose.connect(mongoUri);

async function login(username, password) {

    // try logging in
    const res = await request(app).post('/api/authentication/login').send({
        username: username,
        password: password
    });

    // if success
    if (res.statusCode === 200) {
        return True;
    } else {
        return False;
    }
}