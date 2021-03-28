const config = require('./config.js');

module.exports = {
    'Test CRUD Event': function (client) {
      const users = [
      {
          username: "Maxime",
          password: "Maxime"
      }
      ];

      const events = [
        {
            title: "Seminar",
            start : "2021\t04010900a",
            end : "2021\t04011000a",
            description: "CreateEventTest1",
            location: "McGill University"
        },
        {
          title: "Seminar",
          start : "2021\t04020900a",
          end : "2021\t04021000a",
          description: "CreateEventTest2",
          location: "Mtl"
        }
      ];

      const edits = [
        {
            title: "Seminar",
            start : "2021\t04021000a",
            end : "2021\t04021100a",
            description: "DeleteEventTest1",
            location: "Qc"
        },
        {
          title: "Seminar",
          start : "2021\t04020900a",
          end : "2021\t04021000a",
          description: "DeleteEventTest2",
          location: "Qc"
        }
      ];

      client.windowMaximize()
  
      // Login before creating/updating/deleting events
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

        
      // Create events
      for (var i = 0; i < events.length; i++) {
        client
          .assert.visible(config.id.monthInput)
          .clearValue(config.id.monthInput)
          .setValue(config.id.monthInput, "04\t2021")
          .pause(config.time.pause)
          .assert.visible(config.id.createEvent)
          .click(config.id.createEvent)
          .pause(config.time.pause)
          .assert.visible(config.id.createEventPopup.title)
          .clearValue(config.id.createEventPopup.title)
          .setValue(config.id.createEventPopup.title, events[i].title)
          .pause(config.time.pause)
          .assert.visible(config.id.createEventPopup.start)
          .clearValue(config.id.createEventPopup.start)
          .setValue(config.id.createEventPopup.start, events[i].start)
          .pause(config.time.pause)
          .assert.visible(config.id.createEventPopup.end)
          .clearValue(config.id.createEventPopup.end)
          .setValue(config.id.createEventPopup.end, events[i].end)
          .pause(config.time.pause)
          .assert.visible(config.id.createEventPopup.description)
          .clearValue(config.id.createEventPopup.description)
          .setValue(config.id.createEventPopup.description, events[i].description)
          .pause(config.time.pause)
          .assert.visible(config.id.createEventPopup.location)
          .clearValue(config.id.createEventPopup.location)
          .setValue(config.id.createEventPopup.location, events[i].location)
          .pause(config.time.pause)
          .assert.visible(config.id.createEventPopup.create)
          .click(config.id.createEventPopup.create)
          .pause(config.time.pause)
          .waitForElementVisible('body', config.time.visible)
          .pause(config.time.pause)
      }

      // Update events
      for (var i = 0; i < events.length; i++) {
        client
          .useXpath().click("//*[contains(text(), 'Seminar')]")
          .useCss()
          .pause(config.time.pause)
          .assert.visible('#editButton')
          .click('#editButton')
          .pause(config.time.pause)
          .assert.visible(config.id.editEventPopup.title)
          .clearValue(config.id.editEventPopup.title)
          .setValue(config.id.editEventPopup.title, edits[i].title)
          .pause(config.time.pause)
          .assert.visible(config.id.editEventPopup.start)
          .clearValue(config.id.editEventPopup.start)
          .setValue(config.id.editEventPopup.start, edits[i].start)
          .pause(config.time.pause)
          .assert.visible(config.id.editEventPopup.end)
          .clearValue(config.id.editEventPopup.end)
          .setValue(config.id.editEventPopup.end, edits[i].end)
          .pause(config.time.pause)
          .assert.visible(config.id.editEventPopup.description)
          .clearValue(config.id.editEventPopup.description)
          .setValue(config.id.editEventPopup.description, edits[i].description)
          .pause(config.time.pause)
          .assert.visible(config.id.editEventPopup.location)
          .clearValue(config.id.editEventPopup.location)
          .setValue(config.id.editEventPopup.location, edits[i].location)
          .pause(config.time.pause)
          .assert.visible(config.id.editEventPopup.edit)
          .clearValue(config.id.editEventPopup.edit)
          .click(config.id.editEventPopup.edit)
          .pause(config.time.pause)
          .waitForElementVisible('body', config.time.visible)
          .pause(config.time.pause)
      }

      // Delete events
      for (var i = 0; i < events.length; i++) {
        client
          .useXpath().click("//*[contains(text(), 'Seminar')]")
          .useCss()
          .pause(config.time.pause)
          .assert.visible('#deleteButton')
          .click('#deleteButton')
          .pause(config.time.pause)
          .assert.visible('#btndeleteevent')
          .click('#btndeleteevent')
          .waitForElementVisible('body', config.time.visible)
          .pause(config.time.pause)
      }
      
      client.end();
    }
  }