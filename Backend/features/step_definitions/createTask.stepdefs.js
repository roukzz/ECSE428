const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, And } = require("@cucumber/cucumber");

const app = require("../../server");
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require("../../testdb");

let authToken;

Given("The application is running", async function () {
  await connect();
});

Given("that the user is registered", async function () {
  await clearDatabase();
  const body = {
    username: "Bobby",
    password: "Smithson",
  };
  const res = await request(app)
    .post("/api/authentication/register")
    .send(body);
  assert.strictEqual(res, 200);
});

Given("that the user is logged in", async function () {
  const body = {
    body: {
      username: "Bobby",
      password: "Smithson",
    },
  };
  const res = await request(app).post("/api/authentication/login").send(body);
  assert.strictEqual(res.status, 200);
  console.log(res.text);
  authToken = res.text;
});

Given("No tasks exist for me", function () {
  const header = {
    headers: {
      Authorization: authToken,
    },
  };
  const body = {
    body: {
      username: "Bobby",
      password: "Smithson",
    },
  };
});

Given(
  "I have a task named {word} with description {}",
  function (title, description) {
    const header = {
      headers: {
        Authorization: authToken,
      },
    };
    const body = {
      body: {
        username: "Bobby",
        title: "Task Title",
        description: "Task Description",
      },
    };
  }
);

When(
  "I create a task with title {word} and description {}",
  function (title, description) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Then(
  "I should be notified that another task with the same name already exists",
  function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Then("I should have a task associated to me", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then(
  "I should receive a confirmation that my operation was successful",
  function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);
