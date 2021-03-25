const config = require('./config.js');

module.exports = {
    'Test recover password': function (client) {
        const users = [
            {
                username: "nchamb",
                email: "ecse.428@gmail.com",
                success: "Email has been sent. Please follow the instructions"
            },
            {
                username: "impossibleusername1234",
                email: "impossibleemail1234@gmail.com",
                error: "Student with this username does not exist"
            }
        ];

        client.windowMaximize()

        //Success
        client
            .url(config.url)
            .waitForElementVisible('body', config.time.visible)
            .setValue(config.id.name, users[0].username)
            .pause(config.time.pause)
            .setValue(config.id.email, users[0].email)
            .pause(config.time.pause)
            .click(config.id.recover)
            .pause(config.time.pause)
            .pause(config.time.pause)
            .waitForElementVisible('body', config.time.visible)
            .assert.containsText(config.id.success, users[0].success)

        //Failure
        client
            .url(config.url)
            .waitForElementVisible('body', config.time.visible)
            .setValue(config.id.name, users[1].username)
            .pause(config.time.pause)
            .setValue(config.id.email, users[1].email)
            .pause(config.time.pause)
            .click(config.id.recover)
            .pause(config.time.pause)
            .waitForElementVisible('body', config.time.visible)
            .assert.containsText(config.id.error, users[1].error)

        client.end();
    },
}