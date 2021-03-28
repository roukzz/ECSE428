const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And, DataTable } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const Event = require("../../Models/event");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");


Given(
  "username {string} and password {string} is registered in the system",
  async function (username, password) {
    await connect();
    let student = Student({
      username,
      password,
    });
    let savedStudent = await student.save();
    this.id = savedStudent._id;
  }
);



Given(
  "user has an event with name {string}, start time {string}, end time {string}, location {string}, description {string}",
   async function (name, startTime, endTime, location, desc){
     const res = await request(app)
       .post("/api/event/createNewEvent")
       .send({
         title: name,
         description: desc,
         location: location,
         creatorID: this.id,
         startTime: startTime,
         endTime: endTime,
       })
       .set("auth-token", this.authToken);
     this.answer = res.text;

     return;
   }
);

When('user requests to delete an event with eventid <eventid>',
async  function () {
        // Write code here that turns the phrase above into concrete actions
let eventID = JSON.parse(this.answer)._id;

    const res = await request(app).post("/api/event/deleteEvent").send(
        {eventID: eventID}
    ).set("auth-token", this.authToken);
    this.answer = res.text;
    this.status = res.statusCode;
        return;
      });

When('the user confirms the request', function () {
        // Write code here that turns the phrase above into concrete actions
        return ;
      });

Then('the event is deleted with a confirmation message {string}',

      function (string) {
           // Write code here that turns the phrase above into concrete actions

           assert.strictEqual(this.answer, string);
           return;
      }
);

When('user wishes to delete an event with eventid <eventid>', function () {
         // Write code here that turns the phrase above into concrete actions
         return;
       });


Then('the event is not deleted', function () {
                  // Write code here that turns the phrase above into concrete actions
    return ;
});


Given('the following user with username {string} is currently not logged in the system',

async function (string) {
           // Write code here that turns the phrase above into concrete actions
          this.authToken = null;
         });


Then('I should receive a confirmation that my operation was not successful with status code {string} for delete an event',
  async function (statusCode) {
    console.log("this.status: "+ this.status);
    assert.strictEqual(this.status, parseInt(statusCode));
    await clearDatabase();
    await closeDatabase();
  }
  );
