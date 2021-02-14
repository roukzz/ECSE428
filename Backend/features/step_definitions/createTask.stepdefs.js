const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And, DataTable } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");

let authToken;
let message;
let taskIDMap = new Map();
let status;

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
        title: title,
        description: description,
      })
      .set("auth-token", this.authToken);
    assert.strictEqual(res.statusCode, 200);
    status = res.statusCode;
  }
);

Then("I should have a task associated to me", async function () {
  const res = await request(app)
    .get("/api/student/getStudentTasks")
    .send({
      username: "Bobby",
    })
    .set("auth-token", this.authToken);
  assert.ok(res.body[0].title);
  await clearDatabase();
  await closeDatabase();
});

Then(
  "I should receive a confirmation that my operation was successful",
  async function () {
    assert.strictEqual(status, 200);
    await clearDatabase();
    await closeDatabase();
  }
);

//Update Task Section
Given(
  "that we have the following task in our database:",
  async function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    for (let i = 0; i < dataTable.rows().length; i++) {
      const res = await request(app)
        .post("/api/student/addTaskToStudent")
        .send({
          username: "Bobby",
          title: dataTable.rows()[i][0],
          description: dataTable.rows()[i][1],
        })
        .set("auth-token", this.authToken);
      taskIDMap.set(dataTable.rows()[i][0], [
        JSON.parse(res.text).pop()._id,
        dataTable.rows()[i][1],
      ]);
    }
  }
);

When("I select a task with title {}", function (title) {
  //Nothing to do here
});

When("I change the title of task {} to {}", async function (title, newTitle) {
  let taskId = taskIDMap.get(title)[0];
  let description = taskIDMap.get(title)[1];
  const res = await request(app)
    .put("/api/student/updateStudentTask")
    .send({
      username: "Bobby",
      title: newTitle,
      taskId: taskId,
      description: description,
    })
    .set("auth-token", this.authToken);

  status = res.statusCode;
});

When(
  "I change the description of task {} to {}",
  async function (title, newDescription) {
    let taskId = taskIDMap.get(title) ? taskIDMap.get(title) : null;
    if (taskId) {
      taskId = taskId[0];
    }
    const res = await request(app)
      .put("/api/student/updateStudentTask")
      .send({
        username: "Bobby",
        title: title,
        description: newDescription,
        taskId: taskId,
      })
      .set("auth-token", this.authToken);
    taskIDMap.set(title, [taskId, newDescription]);
    status = res.statusCode;
  }
);

Then(
  "I should receive an error informing me that the requested resource was not found",
  async function () {
    assert.strictEqual(status, 400);
    await clearDatabase();
    await closeDatabase();
  }
);
