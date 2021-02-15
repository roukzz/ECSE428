const config = require('./config.js');

module.exports = {
  'Test create task': function (client) {
    const users = [
      {
        username: "oli",
        password: "password"
      }
    ];
    const tasks = [
      {
        title: "aTask",
        description: "task1"
      },
      {
        title: "anotherTask",
        description: "task2"
      },
      {
        title: "lastTask",
        description: "task3"
      }
    ];
    const updatedTasks = [
      {
        title: "myTask",
        description: "TASK1"
      },
      {
        title: "anotherTask",
        description: "TASK2"
      },
      {
        title: "finalTask",
        description: "TASK3"
      }
    ];
    // Login before creating tasks
    client
        .url(config.url)
        .waitForElementVisible('body', config.time.visible)
        .setValue(config.id.username, users[i].username)
        .pause(config.time.pause)
        .setValue(config.id.password, users[i].password)
        .pause(config.time.pause)
        .click(config.id.login)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .assert.urlEquals(config.destinationUrl_Home);
    // Create tasks
    for (var i = 0; i < tasks.length; i++) {
      client
        // .url(config.url)
        // .waitForElementVisible('body', config.time.visible)
        .click(config.id.createTask)
        .pause(config.time.pause)
        .setValue(config.id.title, tasks[i].title)
        .pause(config.time.pause)
        .setValue(config.id.description, tasks[i].description)
        .pause(config.time.pause)
        .click(config.id.create)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        // .assert.urlEquals(config.destinationUrl_Home);
        .assert.visible(config.newTask)
    // Update tasks
    for (var i = 0; i < tasks.length; i++) {
      client
        // .url(config.url)
        // .waitForElementVisible('body', config.time.visible)
        .click(config.id.updateTask)
        .pause(config.time.pause)
        .setValue(config.id.title, tasks[i].title)
        .pause(config.time.pause)
        .setValue(config.id.description, tasks[i].description)
        .pause(config.time.pause)
        .click(config.id.create)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        // .assert.urlEquals(config.destinationUrl_Home);
        .assert.visible(config.newTask)
    // Delete tasks
    }
    client.end();
  },
  'Test for HTML elements': function (client) {
    client
        .url(config.url)
        .waitForElementVisible('body', config.time.visible)
        .assert.visible(config.id.logo)
        .assert.visible(config.id.intro_text)
        .assert.visible(config.id.form)
        .assert.visible(config.id.fields)
        .assert.visible(config.id.username)
        .assert.visible(config.id.password)
        .assert.visible(config.id.recovery)
        .assert.visible(config.id.login)
        .assert.visible(config.id.signup)
        .end();
  },
  'Test login valid user': function (client) {
    const users = [
      {
        username: "Maxime",
        password: "Maxime"
      }
      // Need more accounts to test
    ];
    for (var i = 0; i < users.length; i++) {
      client
        .url(config.url)
        .waitForElementVisible('body', config.time.visible)
        .setValue(config.id.username, users[i].username)
        .pause(config.time.pause)
        .setValue(config.id.password, users[i].password)
        .pause(config.time.pause)
        .click(config.id.login)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .assert.urlEquals(config.destinationUrl_Home);
    }
    client.end();
  },
  'Test login invalid username': function (client) {
    const users = [
      {
        username: "A",
        password: "abcdef"
      },
      {
        username: "wwwwwwwwwwwwwwwwwww",
        password: "abcdef"
      },
      {
        username: "",
        password: "abcdef"
      },
      {
        username: "山田先生",
        password: "abcdef"
      }
    ];
    for (var i=0; i<users.length; i++) {
      client
        .url(config.url)
        .waitForElementVisible('body', config.time.visible)
        .setValue(config.id.username, users[i].username)
        .pause(config.time.pause)
        .setValue(config.id.password, users[i].password)
        .pause(config.time.pause)
        .click(config.id.login)
        .pause(config.time.pause)
        .assert.urlEquals(config.url)
        .assert.containsText(config.id.error, "Invalid username");
    }
    client.end();
  },
  'Test login invalid password': function (client) {
    const users = [
      {
        username: "Maxime",
        password: "a"
      },
      {
        username: "Maxime",
        password: "wwwwwwwwwwwwwwwwwww"
      },
      {
        username: "Maxime",
        password: ""
      },
      {
        username: "Maxime",
        password: "ラーメンは最高だよ"
      }
    ];
    for (var i=0; i<users.length; i++) {
      client
        .url(config.url)
        .waitForElementVisible('body', config.time.visible)
        .setValue(config.id.username, users[i].username)
        .pause(config.time.pause)
        .setValue(config.id.password, users[i].password)
        .pause(config.time.pause)
        .click(config.id.login)
        .pause(config.time.pause)
        .assert.urlEquals(config.url)
        .assert.containsText(config.id.error, "Invalid password");
    }
    client.end();
  },
  'Test registration navigation': function (client) {
    client
        .url(config.url)
        .waitForElementVisible('body', config.time.visible)
        .click(config.id.signup)
        .waitForElementVisible('body', config.time.visible)
        .assert.urlEquals(config.destinationUrl_Signup);
  }
}