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
      // {
      //   title: "anotherTask",
      //   description: "task2"
      // },
      // {
      //   title: "lastTask",
      //   description: "task3"
      // }
    ];
    const updatedTasks = [
      {
        title: "myTask",
        description: "TASK1"
      },
    //   {
    //     title: "anotherTask",
    //     description: "TASK2"
    //   },
    //   {
    //     title: "finalTask",
    //     description: "TASK3"
    //   }
    ];

    client.windowMaximize()

    // Login before creating tasks
      client
        .url(config.url)
        .waitForElementVisible('body', config.time.visible)
        .setValue(config.id.username, users[0].username)
        .pause(config.time.pause)
        .setValue(config.id.password, users[0].password)
        .pause(config.time.pause)
        .click(config.id.login)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .assert.urlEquals(config.destinationUrl_Home)
    // Create tasks
    for (var i = 0; i < tasks.length; i++) {
      client
        // .url(config.url)
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
        .pause(config.time.pause)
        // .assert.visible(config.newTask)
    }
    // Update tasks
    for (var i = 0; i < tasks.length; i++) {
      client
        // .url(config.url)
        // .waitForElementVisible('body', config.time.visible)
        .click(config.id.updateTask)
        .pause(config.time.pause)
        .setValue(config.id.titleEdit, tasks[i].title)
        .pause(config.time.pause)
        .setValue(config.id.descriptionEdit, tasks[i].description)
        .pause(config.time.pause)
        .click(config.id.update)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        // .assert.urlEquals(config.destinationUrl_Home);
        // .assert.visible(config.newTask)
    }
    // Delete tasks
    for (var i = 0; i < tasks.length; i++) {
      client
        // .url(config.url)
        // .waitForElementVisible('body', config.time.visible)
        .click(config.id.deleteTask)
        .pause(config.time.pause)
        .click(config.id.delete)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        // .assert.urlEquals(config.destinationUrl_Home);
        // .assert.visible(config.newTask)
    }
    client.end();
  },
}