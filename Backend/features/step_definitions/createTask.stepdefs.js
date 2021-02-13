const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");

let authToken;
let message;

Given("The application is running", async function () {
  await connect();
});

Given("that the user is registered", async function () {
  await clearDatabase();

  let student = Student({
    username: "Bobby",
    password: "Smithson",
  });
  await student.save();
});

Given("that the user is logged in", async function () {
  const body = {
    username: "Bobby",
    password: "Smithson",
  };
  const res = await request(app).post("/api/authentication/login").send(body);
  assert.strictEqual(res.statusCode, 200);
  this.authToken = res.text;
});

Given("No tasks exist for me", function () {
  //Guarranteed by initial wipe of database
});

When(
  "I create a task with title {word} and description {}",
  async function (title, description) {
    const res = await request(app)
      .post("/api/student/addTaskToStudent")
      .send({
        username: "Bobby",
        title: "Task Title",
        description: "Task Description",
      })
      .set("auth-token", this.authToken);
    assert.strictEqual(res.statusCode, 200);
    this.message = res.message;
  }
);

Then("I should have a task associated to me", async function () {
  const res = await request(app)
    .get("/api/student/getStudentTasks")
    .send({
      username: "Bobby",
    })
    .set("auth-token", this.authToken);
  assert.strictEqual(res.body[0].title, "Task Title");
});

Then(
  "I should receive a confirmation that my operation was successful",
  function () {
    assert.ifError(this.message);
  }
);
