const config = require('./config.js');

module.exports = {
    'Test update time slot': function (client) {
    const users = [
    {
        username: "haluk",
        password: "124563a"
    }
    ];

    const tasks = [
    {
        title: "TimeSlotTask",
        description: "TimeSlotTask",
        deadline : "12-07-2021"
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

      // create time slot by given task
      client
        .click(config.id.createTimeSlot)
        .pause(config.time.pause)
        .verify.visible('input[id="taskForTimeSlot"]', 'Task')
        .click('#taskForTimeSlot')
        .pause(config.time.pause)
        .setValue(config.id.timeSlotWidget.startTime, "12.07.2021\t10.10")
        .pause(config.time.pause)
        .setValue(config.id.timeSlotWidget.endTime, "12.08.2021\t10.10")
        .pause(config.time.pause)
        .setValue(config.id.timeSlotWidget.descriptionTimeSlot, "TimeSlotDescription")
        .pause(config.time.pause)
        .setValue(config.id.timeSlotWidget.locationTimeSlot, "MainTeam")
        .pause(config.time.pause)
        .setValue('#task','TimeSlotTask')
        .pause(config.time.pause)
        .click(config.id.timeSlotWidget.createbtnTimeSlot)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .pause(config.time.pause)

    // update time slot by given task
    client
        .click(config.id.createTimeSlot)
        .pause(config.time.pause)
        .verify.visible('input[id="taskForTimeSlot"]', 'Task')
        .click('#taskForTimeSlot')
        .pause(config.time.pause)
        .setValue(config.id.timeSlotWidget.startTime, "12.07.2021\t10.10")
        .pause(config.time.pause)
        .setValue(config.id.timeSlotWidget.endTime, "12.08.2021\t10.10")
        .pause(config.time.pause)
        .setValue(config.id.timeSlotWidget.descriptionTimeSlot, "TimeSlotDescription")
        .pause(config.time.pause)
        .setValue(config.id.timeSlotWidget.locationTimeSlot, "MainTeam")
        .pause(config.time.pause)
        .setValue('#task','TimeSlotTask')
        .pause(config.time.pause)
        .click(config.id.timeSlotWidget.createbtnTimeSlot)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .pause(config.time.pause)

      // clear generated tasks
      // Delete tasks
      for (var i = 0; i < tasks.length; i++) {
        client
          .click(config.id.deleteTask)
          .pause(config.time.pause)
          .click(config.id.delete)
          .pause(config.time.pause)
          .waitForElementVisible('body', config.time.visible)
      }
      
      client.end();
    },
  }