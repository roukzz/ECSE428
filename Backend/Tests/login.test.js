const request = require('supertest');

const Student = require("../Models/student");
const app = require('../server');
const { connect, closeDatabase, clearDatabase } = require('../testdb');

// setup mock database connection before each test case
// create a student before each test case
beforeEach(async (done) => {
    await connect();
    let student = Student({
        username: 'student',
        password: 'password'
    });
    await student.save();
    done();
});

// drop the database after each test case
// close the mock database connection after each test
afterEach(async (done) => {
    await clearDatabase();
    done();
});

afterAll(async (done) => {
    await closeDatabase();
    done();
});

describe("User Login Test", () => {

    // Registered user unsuccessful login attempt - failed username validation
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