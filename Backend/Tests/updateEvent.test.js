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

describe("Update Event", () => {
    //Normal task that should succeed
    it("should succeed to update event", async () => {
        const res = await request(app)
            .post("/api/event/updateEvent")
            .send({
                eventID: eventID,
                description: "New Description",
                title: "New Title",
                startTime: new Date(Date.UTC(2021, 3, 1, 10, 30, 0)),
                endTime: new Date(Date.UTC(2021, 3, 1, 12, 0, 0)),
                location: "New Location",
            })
            .set("auth-token", authToken);
        expect(res.statusCode).toEqual(200);
        Event.findOne({ _id: eventID }, function (err, docs) {
            if (err) {
                console.log(err);
                assert.fail();
            } else {
                expect(JSON.stringify(docs.creatorID)).toEqual(
                    JSON.stringify(studentID)
                );
                expect(docs.title).toEqual("New Title");
                expect(docs.description).toEqual("New Description");
            }
        });
    });

    it("Should fail to update an event because of no eventID given", async () => {
        const res = await request(app)
            .post("/api/event/updateEvent")
            .send({
                description: "New Description",
                title: "New Title",
                startTime: new Date(Date.UTC(2021, 3, 1, 10, 30, 0)),
                endTime: new Date(Date.UTC(2021, 3, 1, 12, 0, 0)),
                location: "New Location",
            })
            .set("auth-token", authToken);

        expect(res.statusCode).toEqual(400);
    });
});
