const request = require('supertest');

const Student = require("../Models/student");
const app = require('../server');
const { connect, closeDatabase, clearDatabase } = require('../testdb');
const jwt = require("jsonwebtoken");

var authToken = "";

// setup mock database connection before each test case
// create a student before each test case
beforeEach(async (done) => {
    await connect();
    
    let student = Student({
        username: 'studenttest',
        password: 'passwordtest'
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



describe("Delete an account test", () => {

    // Registered user unsuccessful login attempt - failed username validation
    it("should fail when the given username is not associated with any user", async () => {

        // not registered student name 
        var req = {
            username: "studenttest1",
        };

        var auth = {};
        await loginStudent(auth);

        const res = await request(app).post('/api/student/deleteStudentAccount').send(req).set('auth-token', auth.token)

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual('Student does not exist')
    });


      // Registered user unsuccessful login attempt - failed username validation
      it("should success when the given username found", async () => {

        // not registered student name 
        var req = {
            username: "studenttest",
        };

        var auth = {};
        await loginStudent(auth);

        const res = await request(app).post('/api/student/deleteStudentAccount').send(req).set('auth-token', auth.token)

        expect(res.statusCode).toEqual(200);
    });

    // Registered user unsuccessful login attempt - failed username validation
    it("should failed when user not logged in", async () => {

        // not registered student name 
        var req = {
            username: "studenttest",
        };

        var auth = {};
        auth.token = 'invalid'

        const res = await request(app).post('/api/student/deleteStudentAccount').send(req).set('auth-token', auth.token)

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual('Invalid Token');
    });

});

async function loginStudent(auth) {

    const res = await request(app).post("/api/authentication/login").send({
        username: 'studenttest',
        password: 'passwordtest',
    });
    auth.token = res.headers['auth-token'];

    expect(res.statusCode).toEqual(200);
};
