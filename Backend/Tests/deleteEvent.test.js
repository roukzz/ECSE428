const request = require("supertest");

const Student = require("../Models/student");
const Event = require("../Models/event");

const app = require("../server");
let savedStudent;
const { connect, closeDatabase, clearDatabase } = require("../testdb");
let authToken;
let eventID;
let studentID;
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

    const res = await request(app).post("/api/authentication/login").send({
        username: "student",
        password: "password",
    });

    authToken = res.text;
    studentID = student._id;

    const res1 = await request(app).post("/api/event/createNewEvent")
        .send({
            creatorID: studentID,
            title: "Exam Review",
            description: "Description",
            startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
            endTime: new Date(Date.UTC(2021, 3, 1, 16, 0, 0)),
            location: "Montreal",
            attendees: []
        }).set("auth-token", authToken);;

    eventID = res1.body._id;

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

describe("Delete Event", () => {
    //Normal task that should succeed
    it("should succeed to delete event", async () => {
        const res = await request(app)
            .post("/api/event/deleteEvent")
            .send({
                eventID: eventID,
            })
            .set("auth-token", authToken);
        expect(res.statusCode).toEqual(200);
        Event.findOne({ _id: eventID }, function (err, docs) {
            if (err) {
                console.log(err);
                assert.fail();
            } else {
                expect(docs).toEqual(null);
            }
        });
    });

    it("Should fail to delete an event because of no eventID given", async () => {
        const res = await request(app)
            .post("/api/event/deleteEvent")
            .send({
                title: "Exam review",
            })
            .set("auth-token", authToken);

        expect(res.statusCode).toEqual(400);
    });
});
