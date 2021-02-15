const config = require('./config.js');

module.exports = {
  'Test for HTML elements': function (client) {
    users = [
      {
        username: "Maxime",
        password: "Maxime"
      }
    ]

    client.windowMaximize()

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
        .assert.visible(config.id.settings)
        .click(config.id.settings)
        .pause(config.time.pause)
        .assert.visible(config.id.signout)
        .end();
  },
  'Test for signout': function (client) {
    users = [
      {
        username: "Maxime",
        password: "Maxime"
      }
    ]
    for (var i = 0; i < users.length; i++) {
      client
          .url(config.urls.login)
          .windowMaximize()
          .waitForElementVisible('body', config.time.visible)
          .assert.visible(config.id.username)
          .assert.visible(config.id.password)
          .assert.visible(config.id.login)
          .setValue(config.id.username, users[i].username)
          .pause(config.time.pause)
          .setValue(config.id.password, users[i].password)
          .pause(config.time.pause)
          .click(config.id.login)
          .pause(config.time.pause)
          .waitForElementVisible('body', config.time.visible)
          .assert.urlEquals(config.urls.home)
          .click(config.id.settings)
          .pause(config.time.pause)
          .click(config.id.signout)
          .pause(config.time.pause)
          .waitForElementVisible('body', config.time.visible)
          .assert.urlEquals(config.urls.login)
          .execute(function() {
            return window.localStorage.getItem('username');
          }, [], 
            function (result) {
              this.assert.equal(result.value, null);
          })
    }
    client.end();
  },
}