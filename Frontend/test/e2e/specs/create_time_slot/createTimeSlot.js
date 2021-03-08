const config = require('./config.js');
const moment = require('moment');

module.exports = {
    'Test create time slot': function (client) {
      const users = [
        {
          username: "haluk",
          password: "124563a"
        }
      ];

      let tomorrowDate  = moment().add('days',1);
      let taskDueDate  = "09:00";
      let slotStartTime = "10:10";
      let slotEndTime = "11:10";

      let tomorrow = tomorrowDate.format("DD-MM-YYYY");
      let taskTime = tomorrow + "\t" + taskDueDate;
      let taskId = "#task"+tomorrowDate.format("YYYY-MM-DD")+"T" + taskDueDate

      let startTimeSlot = tomorrow+"\t"+slotStartTime
      let endTimeSlot = tomorrow+"\t" + slotEndTime
      let timeSlotId = "#timeslot"+tomorrowDate.format("YYYY-MM-DD")+"T"+slotStartTime
      
      

      const tasks = [
        {
          title: "TimeSlotTask",
          description: "TimeSlotTask",
          deadline : taskTime
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
          // .url(config.url)
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
          // .assert.urlEquals(config.destinationUrl_Home);
          .pause(config.time.pause)
          // .assert.visible(config.newTask)
      }
      
      

      // create time slot by given task
      client
      .click(config.id.createTimeSlot)
      .pause(config.time.pause)
      .verify.visible('input[id="taskForTimeSlot"]', 'Task')
      .click('#taskForTimeSlot')
      .pause(config.time.pause)
      .setValue(config.id.timeSlotWidget.startTime, startTimeSlot)
      .pause(config.time.pause)
      .setValue(config.id.timeSlotWidget.endTime, endTimeSlot)
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
      // .assert.urlEquals(config.destinationUrl_Home);
      .pause(config.time.pause)
      // .assert.visible(config.newTask)
      
      //

      console.log(timeSlotId);
      //delete time slot
      client
          .url(config.url)
          .waitForElementVisible('body', config.time.visible)
          .click("#timeslot-created")
          .pause(config.time.pause)
          .click(config.id.popup.deleteButton)
          .pause(config.time.pause)
          .click(config.id.popup.confirmDelete)
          .pause(config.time.pause)
          .waitForElementVisible('body', config.time.visible)


          /*
      //delete created task
      client
      .url(config.urls.home)
      .waitForElementVisible('body', config.time.visible)
      .click("#task-created")
      .pause(config.time.pause)
      .click(config.id.popup.deleteButton)
      .pause(config.time.pause)
      .click(config.id.popup.confirmDelete)
      .pause(config.time.pause)
      .waitForElementVisible('body', config.time.visible)

      */

  
      client.end();
    },
  }