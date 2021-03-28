const config = require('./config.js');

module.exports = {
    'Test create-update-delete reminder': function (client) {
    const users = [
    {
        username: "haluk",
        password: "124563a"
    }
    ];

    const reminders = [
    {
        title: "ReminderTitle",
        titleEditReminder: "EditReminderTitle",
        description: "ReminderDescription",
        descriptionEditReminder: "EditReminderDescription",
        deadline : "2021\t04011100a",
        deadlineEditReminder: "2022\t04011100a",
        priority: "High",
        priorityEditReminder: "Low",
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
          .click(config.id.createReminder)
          .pause(config.time.pause)
          .setValue(config.id.title, reminders[i].title)
          .pause(config.time.pause)
          .setValue(config.id.description, reminders[i].description)
          .pause(config.time.pause)
          .setValue(config.id.deadline, reminders[i].deadline)
          .pause(config.time.pause)
          .assert.visible("#priority")
          .setValue("#priority", reminders[i].priority)
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

      //Update reminders
      for (var i = 0; i < reminders.length; i++) {
        client
          .click('#reminderButton')
          .pause(config.time.pause)
          .click('#eReminderButton')
          .pause(config.time.pause)
          .clearValue(config.id.titleEditReminder)
          .pause(config.time.pause)
          .setValue(config.id.titleEditReminder, reminders[i].titleEditReminder)
          .pause(config.time.pause)
          .clearValue(config.id.descriptionEditReminder)
          .pause(config.time.pause)
          .setValue(config.id.descriptionEditReminder, reminders[i].descriptionEditReminder)
          .pause(config.time.pause)
          .clearValue(config.id.deadlineEditReminder)
          .pause(config.time.pause)
          .setValue(config.id.deadlineEditReminder, reminders[i].deadlineEditReminder)
          .pause(config.time.pause)
          .clearValue("#priorityEditReminder")
          .setValue("#priorityEditReminder", reminders[i].priorityEditReminder)
          .click(config.id.update)
          .pause(config.time.pause)
          .waitForElementVisible('body', config.time.visible)
          .pause(config.time.pause)
      }

      // Check if reminder has been updated
      for(var i = 0; i < reminders.length; i++){
        client
        .click('#reminderButton')
        .pause(config.time.pause)
        .useXpath()
        .assert.containsText("//*[contains(text(), " + reminders[i].titleEditReminder + ")]", reminders[i].titleEditReminder)
        .assert.containsText("//*[contains(text(), " + reminders[i].descriptionEditReminder + ")]", reminders[i].descriptionEditReminder)
        .assert.containsText("//*[contains(text(), " + reminders[i].priorityEditReminder + ")]", reminders[i].priorityEditReminder)
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