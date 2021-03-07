const request = require("supertest");

const Student = require("../Models/student");
const timeslot = require("../Models/timeslot");
const app = require("../server");
const { connect, closeDatabase, clearDatabase } = require("../testdb");
let authToken;
let classID;
let timeSID;
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

    const res1 = await request(app).post("/api/class/addNewClass")
        .send({
            username: "student",
            title: "ECSE 428",
            description: "Software Engineering Practice",
            startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
            endTime: new Date(Date.UTC(2021, 5, 7, 20, 0, 0)),
            location: "Montreal",
        }).set("auth-token", authToken);;

    classID = res1.body._id;
    const res2 = await request(app).post("/api/class/addTimeslotToClass")
        .send({
            username: "student",
            classID : classID,
            timeslot: {
                startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
                endTime: new Date(Date.UTC(2021, 5, 7, 17, 0, 0)),
                description: "alloooo",
                location: "toronto",
            }
        }).set("auth-token", authToken);;

     timeSID =  res2.body[0]._id;
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

describe("Update Time Slot of a Class Login Test", () => {
    //Normal task that should succeed
    it("should succeed to update time slot", async () => {
        const res = await request(app)
            .post("/api/class/updateTimeSlotClass")
            .send({
                username: "student",
                classID: classID,
                timeSID: timeSID,
                startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
                endTime: new Date(Date.UTC(2021, 3, 1, 16, 0, 0)),
                location: "New Location",
            })
            .set("auth-token", authToken);
        expect(res.statusCode).toEqual(200);
        Student.findOne({ username: "student" }, function (err, docs) {
            if (err) {
                console.log(err);
                assert.fail();
            } else {
                if (docs) {
                    expect(docs.classes[0].timeslots[0].location).toEqual("New Location");
                }
            }
        });
    });

    it("Failure", async () => {
        // give the wrong username
        const res = await request(app)
            .post("/api/class/updateTimeSlotClass")
            .send({
                username: "stud",
                classID: classID,
                timeSID: timeSID,
                startTime: new Date(Date.UTC(2021, 3, 1, 14, 30, 0)),
                endTime: new Date(Date.UTC(2021, 3, 1, 16, 0, 0)),
                location: "New Location",
            })
            .set("auth-token", authToken);
        expect(res.statusCode).toEqual(400);
    });
});
