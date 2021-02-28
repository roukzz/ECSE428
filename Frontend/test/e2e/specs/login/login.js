const config = require('./config.js');

module.exports = {
  'Test for HTML elements': function (client) {

    client.windowMaximize()

    client
        .url(config.url)
        .waitForElementVisible('body', config.time.visible)
        .assert.visible(config.id.logo)
        .assert.visible(config.id.intro_text)
        .assert.visible(config.id.form)
        .assert.visible(config.id.fields)
        .assert.visible(config.id.username)
        .assert.visible(config.id.password)
        .assert.visible(config.id.recovery)
        .assert.visible(config.id.login)
        .assert.visible(config.id.signup)
        .end();
  },
  'Test login valid user': function (client) {
    const users = [
      {
        username: "Maxime",
        password: "Maxime"
      }
      // Need more accounts to test
    ];
    for (var i = 0; i < users.length; i++) {
      client
        .url(config.url)
        .windowMaximize()
        .waitForElementVisible('body', config.time.visible)
        .setValue(config.id.username, users[i].username)
        .pause(config.time.pause)
        .setValue(config.id.password, users[i].password)
        .pause(config.time.pause)
        .click(config.id.login)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .assert.urlEquals(config.destinationUrl_Home)
        .execute(function(data) {
          return {storage: window.localStorage.getItem('username'), username: data};
        }, [users[i].username], 
          function (result) {
            this.assert.equal(result.value.storage,result.value.username);
        })
    }
    client.end();
  },
  'Test login invalid username': function (client) {
    const users = [
      {
        username: "A",
        password: "abcdef"
      },
      {
        username: "wwwwwwwwwwwwwwwwwww",
        password: "abcdef"
      },
      {
        username: "",
        password: "abcdef"
      },
      {
        username: "山田先生",
        password: "abcdef"
      }
    ];
    for (var i=0; i<users.length; i++) {
      client
        .url(config.url)
        .windowMaximize()
        .waitForElementVisible('body', config.time.visible)
        .setValue(config.id.username, users[i].username)
        .pause(config.time.pause)
        .setValue(config.id.password, users[i].password)
        .pause(config.time.pause)
        .click(config.id.login)
        .pause(config.time.pause)
        .assert.urlEquals(config.url)
        .assert.containsText(config.id.error, "Invalid username");
    }
    client.end();
  },
  'Test login invalid password': function (client) {
    const users = [
      {
        username: "Maxime",
        password: "a"
      },
      {
        username: "Maxime",
        password: "wwwwwwwwwwwwwwwwwww"
      },
      {
        username: "Maxime",
        password: ""
      },
      {
        username: "Maxime",
        password: "ラーメンは最高だよ"
      }
    ];
    for (var i=0; i<users.length; i++) {
      client
        .url(config.url)
        .windowMaximize()
        .waitForElementVisible('body', config.time.visible)
        .setValue(config.id.username, users[i].username)
        .pause(config.time.pause)
        .setValue(config.id.password, users[i].password)
        .pause(config.time.pause)
        .click(config.id.login)
        .pause(config.time.pause)
        .assert.urlEquals(config.url)
        .assert.containsText(config.id.error, "Invalid password");
    }
    client.end();
  },
  'Test registration navigation': function (client) {
    client
        .url(config.url)
        .windowMaximize()
        .waitForElementVisible('body', config.time.visible)
        .click(config.id.signup)
        .pause(config.time.pause)
        .waitForElementVisible('body', config.time.visible)
        .assert.urlEquals(config.destinationUrl_Signup)
        .end();
  }
}