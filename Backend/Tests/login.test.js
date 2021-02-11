const request = require('supertest');
const mongoose = require('mongoose');

const Student = require("../Models/student");
const app = require('../server');
const { mongoUri } = require('../globalConfig.json');

// setup mock database connection before each test case
// create a student before each test case
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

// drop the database after each test case
// close the mock database connection after each test
afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

describe("User Login Test", () => {

    // Registered user unsucessful login attempt - failed username validation
    it("should fail login due to username validation", async () => {

        // login with invalid username but right password
        const res = await request(app).post('/api/authentication/login').send({
            username: "st",
            password: "password"
        });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("\"username\" length must be at least 3 characters long")
    });

    // Registered user unsuccessful login attempt - failed password validation
    it("should fail login due to password validation", async () => {

        // login with invalid password but right username
        const res = await request(app).post('/api/authentication/login').send({
            username: "student",
            password: "pas"
        });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("\"password\" length must be at least 6 characters long");
    })

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
    it("should fail login due to false password", async () => {

        //login with right username but wrong password
        const res = await request(app).post('/api/authentication/login').send({
            username: "student",
            password: "Password"
        });

        expect(res.statusCode).toEqual(403);
        expect(res.text).toEqual("Invalid password");
    });

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
});