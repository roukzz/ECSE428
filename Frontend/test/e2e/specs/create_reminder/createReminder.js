const config = require('./config.js');

module.exports = {
    'Test create reminder': function (client) {
    const users = [
    {
        username: "haluk",
        password: "124563a"
    }
    ];

    const reminders = [
    {
        title: "ReminderTitle",
        description: "ReminderDescription",
        deadline : "2021\t04011100a"
    },
    ];

    client.windowMaximize()
  
    // Login before creating reminders
    client
        .url(config.urls.login)
        .waitForElementVisible('body', config.time.visible)
        .assert.visible(config.id.username)
        .assert.visible(config.id.password)
        .assert.visible(config.id.login)
        .setValue(config.id.username, users[0].username)
        .pause(config.time.pause)
        .setValue(config.id.password, users[0].password)
        .pause(config.time.pause)
        .click(config.id.login)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .assert.urlEquals(config.urls.home)

        
      // Create reminders
      for (var i = 0; i < reminders.length; i++) {
        client
          .click('#createReminderButton')
          .pause(config.time.pause)
          .setValue(config.id.title, reminders[i].title)
          .pause(config.time.pause)
          .setValue(config.id.description, reminders[i].description)
          .pause(config.time.pause)
          .setValue(config.id.deadline, reminders[i].deadline)
          .pause(config.time.pause)
          .click(config.id.create)
          .pause(config.time.pause)
          .waitForElementVisible('body', config.time.visible)
          .pause(config.time.pause)
      }

      // Check if reminder has been created
      for(var i = 0; i < reminders.length; i++){
        client
        .click('#reminderButton')
        .pause(config.time.pause)
        .useXpath()
        .assert.containsText("//*[contains(text(), " + reminders[i].title + ")]", reminders[i].title)
        .assert.containsText("//*[contains(text(), " + reminders[i].description + ")]", reminders[i].description)
        .useCss()
        .waitForElementVisible('body', config.time.visible)
        .pause(config.time.pause)
      }

      // clear generated reminders
      // Delete reminders
      for (var i = 0; i < reminders.length; i++) {
        client
        .click('#deleteReminderButton')
        .pause(config.time.pause)
        .click(config.id.delete)
        .waitForElementVisible('body', config.time.visible)
        .pause(config.time.pause)
      }
      
      client.end();
    },
  }