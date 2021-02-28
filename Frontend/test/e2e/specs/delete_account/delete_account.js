const config = require('./config.js');

module.exports = {
  'Test for Delete Account': function (client) {
    users = [
      {
        username: "DeleteAccTest",
        password: "DeleteAccTest",
        email: "test@test"
      },
      {
        username: "DeleteMe",
        password: "DeleteMe",
        email: "test@test"
      }
    ]
    for (var i = 0; i < users.length; i++) {
      client
        .windowMaximize()
        .url(config.urls.login)
        .waitForElementVisible('body', config.time.visible)
        .assert.visible(config.id.login_signup)
        .click(config.id.login_signup)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .assert.urlEquals(config.urls.signup)
        .assert.visible(config.id.signup_email)
        .setValue(config.id.signup_email, users[0].email)
        .pause(config.time.pause)
        .assert.visible(config.id.signup_name)
        .setValue(config.id.signup_name, users[0].username)
        .pause(config.time.pause)
        .assert.visible(config.id.signup_nonPartner)
        .click(config.id.signup_nonPartner)
        .pause(config.time.pause)
        .assert.visible(config.id.signup_psw)
        .setValue(config.id.signup_psw, users[0].password)
        .pause(config.time.pause)
        .assert.visible(config.id.signup_pswRepeat)
        .setValue(config.id.signup_pswRepeat, users[0].password)
        .pause(config.time.pause)
        .assert.visible(config.id.signup_btn)
        .click(config.id.signup_btn)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .assert.urlEquals(config.urls.home)
        .click(config.id.settings)
        .pause(config.time.pause)
        .click(config.id.profile)
        .pause(config.time.pause)
        .click(config.id.delete_acc)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .assert.urlEquals(config.urls.login)
    }
    client.end();
  }
}