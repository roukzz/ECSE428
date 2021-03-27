const config = require('./config.js');

module.exports = {
  'Test update user credentials': function (client) {
    const users = [
      {
        username: "oli",
        password: "password"
      }
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

    //Edit user credentials
        .click(config.id.dropdown)
        .pause(config.time.pause)
        .click(config.id.profile)
        .pause(config.time.pause)
        .clearValue(config.id.emailEdit)
        .pause(config.time.pause)
        .setValue(config.id.emailEdit, "email@email.com")
        .pause(config.time.pause)
        .clearValue(config.id.passwordEdit)
        .pause(config.time.pause)
        .setValue(config.id.passwordEdit, "newPassword")
        .pause(config.time.pause)
        .click(config.id.updateUserCredentials)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .click(config.id.signout)
        //login again
        .url(config.url)
        .waitForElementVisible('body', config.time.visible)
        .setValue(config.id.username, users[0].username)
        .pause(config.time.pause)
        .setValue(config.id.password, "newPassword")
        .pause(config.time.pause)
        .click(config.id.login)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .assert.urlEquals(config.destinationUrl_Home)
        //verify the appropriate changes
        .click(config.id.dropdown)
        .pause(config.time.pause)
        .click(config.id.profile)
        .waitForElementVisible('body', config.time.visible)
        .pause(config.time.pause)
        //Put back the old info
        .clearValue(config.id.emailEdit)
        .pause(config.time.pause)
        .setValue(config.id.emailEdit, "oli@email.com")
        .pause(config.time.pause)
        .clearValue(config.id.passwordEdit)
        .pause(config.time.pause)
        .setValue(config.id.passwordEdit, "password")
        .pause(config.time.pause)
        .click(config.id.updateUserCredentials)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .click(config.id.signout)

    client.end();
  },
}