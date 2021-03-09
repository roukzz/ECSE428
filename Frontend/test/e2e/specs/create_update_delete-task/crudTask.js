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
    ];
    const updatedTasks = [
      {
        title: "myTask",
        description: "TASK1"
      },
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
        .click(config.id.createTask)
        .pause(config.time.pause)
        .setValue(config.id.title, tasks[i].title)
        .pause(config.time.pause)
        .setValue(config.id.description, tasks[i].description)
        .pause(config.time.pause)
        .setValue('#deadline', '2021\t03061100a')
        .pause(config.time.pause)
        .click(config.id.create)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .pause(config.time.pause)
    }
    // Update tasks
    for (var i = 0; i < tasks.length; i++) {
      client
        .useXpath().click("//*[contains(text(), 'aTask')]")
        .useCss()        
        .pause(config.time.pause)
        .click('#editButton')
        .pause(config.time.pause)
        .clearValue(config.id.titleEdit)
        .setValue(config.id.titleEdit, tasks[i].title)
        .pause(config.time.pause)
        .clearValue(config.id.descriptionEdit)
        .setValue(config.id.descriptionEdit, tasks[i].description)
        .pause(config.time.pause)
        .setValue('#deadlineEdit', '2021\t03071100a')
        .click(config.id.update)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
    }
    // Delete tasks
    for (var i = 0; i < tasks.length; i++) {
      client
        .useXpath().click("//*[contains(text(), 'aTask')]")
        .useCss()
        .click('#deleteButton')
        .pause(config.time.pause)
        .click(config.id.delete)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
    }
    client.end();
  },
}