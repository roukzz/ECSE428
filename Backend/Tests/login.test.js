const request = require('supertest');
const mongoose = require('mongoose');

const Student = require("../Models/student");
const app = require('../server');
const { mongoUri } = require('../globalConfig.json');

beforeEach((done) => {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async () => {

        // add student to the database
        let student = new Student({
            username: "student",
            password: "password"
        });
        await student.save();
        done();
    });
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

describe("User Login Test", () => {

    // Registered Student successful login attempt
    it("should login successfully", async () => {

        // login with the newly created student
        const res = await request(app).post('/api/authentication/login').send({
            username: "student",
            password: "password" 
        });

        expect(res.statusCode).toEqual(200);
        expect(res.headers).toHaveProperty('auth-token');
    });

    // Registered user unsuccessful login attempt - wrong username
    it("should fail login due to false username", async () => {

        // login with wrong username but right password
        const res = await request(app).post('/api/authentication/login').send({
            username: "Student",
            password: "password"
        });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("Invalid username");
    });

    // Registered user unsuccessful login attempt - wrong password
});