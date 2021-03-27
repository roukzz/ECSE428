const { iteratee } = require("lodash");
const request = require("supertest");

const Student = require("../Models/student");
const app = require('../server');
const { connect, closeDatabase, clearDatabase } = require("../testdb");

describe("Update User Credentials Tests", () => {
    
    // setup mock database connection before each test case
    // create a student before each test case
    beforeEach(async (done) => {
        await connect();
        let student = Student({
        username: "student",
        password: "password",
        email: "email@email.com",
        });
        await student.save();
        this.student = student;
        const response = await request(app).post("/api/authentication/login").send({
            username: "student",
            password: "password"
        });
        this.authToken = response.text;
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

    it("should fail due to username validation fail", async () => {
        const res = await request(app).post("/api/student/editStudentInfo").send({
            username: "st",
            newPassword: "Password",
            newEmail: "student@student.com"
        }).set("auth-token", this.authToken);
        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual('"username" length must be at least 3 characters long');
    });

    it("should fail due to newPassword validation fail", async () => {
        const res = await request(app).post("/api/student/editStudentInfo").send({
            username: this.student.username,
            newPassword: "pass",
            newEmail: "student@student.com"
        }).set("auth-token", this.authToken);
        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual('"newPassword" length must be at least 6 characters long');
    });

    it("should fail due to a non-existing username", async () => {
        const res = await request(app).post("/api/student/editStudentInfo").send({
            username: "Student",
            newPassword: "Password",
            newEmail: "student@student.com"
        }).set("auth-token", this.authToken);
        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("Student does not exist");
    });

    it("should update the credentials of the student", async () => {
        const res = await request(app).post("/api/student/editStudentInfo").send({
            username: this.student.username,
            newPassword: "Password",
            newEmail: "student@student.com"
        }).set("auth-token", this.authToken);
        const updatedStudent = await Student.findOne({ username: this.student.username });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual("Your info has been updated");
        expect(updatedStudent.password).not.toEqual(this.student.password);
        expect(updatedStudent.email).not.toEqual(this.student.email);
    });
});