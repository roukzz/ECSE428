const config = require('./config.js');

module.exports = {
    'Test CRUD timeslot': function (client) {
      const users = [
      {
          username: "Maxime",
          password: "Maxime"
      }
      ];

      const tasks = [
      {
          title: "TimeSlotTask",
          description: "TimeSlotTask",
          deadline : "2021\t03061100a"
      },
      ];

      client.windowMaximize()
    
      // Login before creating tasks
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

          
      // Create tasks
      for (var i = 0; i < tasks.length; i++) {
        client
          .click(config.id.createTask)
          .pause(config.time.pause)
          .setValue(config.id.title, tasks[i].title)
          .pause(config.time.pause)
          .setValue(config.id.description, tasks[i].description)
          .pause(config.time.pause)
          .setValue(config.id.deadline, tasks[i].deadline)
          .pause(config.time.pause)
          .click(config.id.create)
          .pause(config.time.pause)
          .waitForElementVisible('body', config.time.visible)
          .pause(config.time.pause)
      }

      // create time slot of given task
      client
        .click(config.id.createTimeSlot)
        .pause(config.time.pause)
        .verify.visible('input[id="taskForTimeSlot"]', 'Task')
        .click('#taskForTimeSlot')
        .pause(config.time.pause)
        .assert.visible(config.id.timeSlotWidget.startTime)
        .setValue(config.id.timeSlotWidget.startTime, "2021\t03061000a")
        .pause(config.time.pause)
        .assert.visible(config.id.timeSlotWidget.endTime)
        .setValue(config.id.timeSlotWidget.endTime, "2021\t03061030a")
        .pause(config.time.pause)
        .assert.visible(config.id.timeSlotWidget.descriptionTimeSlot)
        .setValue(config.id.timeSlotWidget.descriptionTimeSlot, "TimeSlotDescription")
        .pause(config.time.pause)
        .assert.visible(config.id.timeSlotWidget.locationTimeSlot)
        .setValue(config.id.timeSlotWidget.locationTimeSlot, "TimeSlotLocation")
        .pause(config.time.pause)
        .assert.visible('#task')
        .setValue('#task','TimeSlotTask')
        .pause(config.time.pause)
        .click(config.id.timeSlotWidget.createbtnTimeSlot)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .pause(config.time.pause)

      // update time slot of given task
      client
        .useXpath().click("//*[contains(text(), 'TimeSlotDescription')]")
        .useCss()
        .pause(config.time.pause)
        .click('#editButton')
        .pause(config.time.pause)
        .setValue('#startTimeEdit', "2021\t03061030a")
        .pause(config.time.pause)
        .setValue('#endTimeEdit', "2021\t03061100a")
        .pause(config.time.pause)
        .clearValue('#descriptionEditTimeSlot')
        .setValue('#descriptionEditTimeSlot', "TimeSlotNewDescription")
        .pause(config.time.pause)
        .clearValue('#locationEditTimeSlot')
        .setValue('#locationEditTimeSlot', "TimeSlotNewLocation")
        .pause(config.time.pause)
        .click('#editbtnTimeSlot')
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .pause(config.time.pause)

      // Delete timeslot
      client
        .useXpath().click("//*[contains(text(), 'TimeSlotNewDescription')]")
        .useCss()
        .pause(config.time.pause)
        .assert.visible('#deleteButton')
        .click('#deleteButton')
        .pause(config.time.pause)
        .assert.visible('#btndeleteclass')
        .click('#btndeleteclass')
        .waitForElementVisible('body', config.time.visible)
        .pause(config.time.pause)

      // clear generated tasks
      // Delete tasks
      for (var i = 0; i < tasks.length; i++) {
        client
          .useXpath().click("//*[contains(text(), 'TimeSlotTask')]")
          .useCss()
          .pause(config.time.pause)
          .click('#deleteButton')
          .pause(config.time.pause)
          .click('#btndelete')
          .waitForElementVisible('body', config.time.visible)
      }
      
        client.end();
    },
  }