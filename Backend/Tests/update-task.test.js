const request = require('supertest');

const Student = require("../Models/student");
const Task = require("../Models/task");
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
    let task = Task({
        title: "Task",
        description: "Task description"
    });
    await task.save();
    student.tasks.push(task);
    await student.save();
    this.student = student;
    this.task = task;
    done();
});

afterEach(async (done) => {
    await clearDatabase();
    done();
});

afterAll(async (done) => {
    await closeDatabase();
    done();
});

describe("Update Task Test", () => {
    
    it("should update a task of an authenticated user", async () => {
        const res1 = await request(app).post('/api/authentication/login').send({
            username: 'student',
            password: 'password'
        });
        const res2 = await request(app).put('/api/student/updateStudentTask').set("auth-token", res1.headers["auth-token"])
        .send({
            username: 'student',
            taskId: this.task._id.toString(),
            title: "New Title",
            description: "New Description"
        });
        expect(res2.statusCode).toEqual(200);
        expect(res2.body).not.toEqual(this.student.tasks);
    });

    it("should not update a task of an unauthenticated user", async () => {
        const res = await request(app).put('/api/student/updateStudentTask').send({
            username: 'student',
            taskId: this.task._id.toString(),
            title: "New Title",
            description: "New Description"
        });
        expect(res.statusCode).toEqual(401);
        expect(res.text).toEqual("Access Denied");
    });
});