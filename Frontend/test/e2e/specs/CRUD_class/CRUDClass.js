const config = require('./config.js');

module.exports = {
    'Test CRUD class': function (client) {
      const users = [
      {
          username: "Maxime",
          password: "Maxime"
      }
      ];

      const classes = [
      {
          name: "ECSE 458",
          start : "2021-03-05",
          end : "2021-03-15",
          description: "DeleteClassTest1",
          location: "McGill University"
      },
      {
        name: "ECSE 321",
        start : "2021-03-04",
        end : "2021-03-06",
        description: "DeleteClassTest2",
        location: "McGill University"
      }
      ];

      const edits = [
      {
          name: "ECSE 458",
          start : "2021-03-01",
          end : "2021-03-19",
          description: "DeleteClassTest3",
          location: "McGill University"
      },
      {
        name: "ECSE 321",
        start : "2021-03-03",
        end : "2021-03-30",
        description: "DeleteClassTest4",
        location: "Montreal"
      }
      ];

      client.windowMaximize()
  
      // Login before creating/updating/deleting classes
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

        
      // Create classes
      for (var i = 0; i < classes.length; i++) {
        client
          .assert.visible(config.id.createClass)
          .click(config.id.createClass)
          .pause(config.time.pause)
          .assert.visible(config.id.createClassPopup.classname)
          .setValue(config.id.createClassPopup.classname, classes[i].name)
          .pause(config.time.pause)
          .assert.visible(config.id.createClassPopup.start)
          .setValue(config.id.createClassPopup.start, classes[i].start)
          .pause(config.time.pause)
          .assert.visible(config.id.createClassPopup.end)
          .setValue(config.id.createClassPopup.end, classes[i].end)
          .pause(config.time.pause)
          .assert.visible(config.id.createClassPopup.description)
          .setValue(config.id.createClassPopup.description, classes[i].description)
          .pause(config.time.pause)
          .assert.visible(config.id.createClassPopup.location)
          .setValue(config.id.createClassPopup.location, classes[i].location)
          .pause(config.time.pause)
          .assert.visible(config.id.createClassPopup.create)
          .click(config.id.createClassPopup.create)
          .pause(config.time.pause)
          .waitForElementVisible('body', config.time.visible)
          .pause(config.time.pause)
      }

      // Update class
      for (var i = 0; i < classes.length; i++) {
        client
          .useXpath().click("//*[contains(text(), 'Start')]")
          .useCss()
          .pause(config.time.pause)
          .assert.visible('#editButton')
          .click('#editButton')
          .pause(config.time.pause)
          .assert.visible(config.id.editClassPopup.classname)
          .setValue(config.id.editClassPopup.classname, edits[i].name)
          .pause(config.time.pause)
          .assert.visible(config.id.editClassPopup.start)
          .setValue(config.id.editClassPopup.start, edits[i].start)
          .pause(config.time.pause)
          .assert.visible(config.id.editClassPopup.end)
          .setValue(config.id.editClassPopup.end, edits[i].end)
          .pause(config.time.pause)
          .assert.visible(config.id.editClassPopup.description)
          .setValue(config.id.editClassPopup.description, edits[i].description)
          .pause(config.time.pause)
          .assert.visible(config.id.editClassPopup.location)
          .setValue(config.id.editClassPopup.location, edits[i].location)
          .pause(config.time.pause)
          .assert.visible(config.id.editClassPopup.edit)
          .click(config.id.editClassPopup.edit)
          .pause(config.time.pause)
          .waitForElementVisible('body', config.time.visible)
          .pause(config.time.pause)
      }

      // Delete classes
      for (var i = 0; i < classes.length; i++) {
        client
          .useXpath().click("//*[contains(text(), 'Start')]")
          .useCss()
          .pause(config.time.pause)
          .assert.visible('#deleteButton')
          .click('#deleteButton')
          .pause(config.time.pause)
          .assert.visible('#btndeleteclass')
          .click('#btndeleteclass')
          .waitForElementVisible('body', config.time.visible)
      }
      
      client.end();
    }
  }