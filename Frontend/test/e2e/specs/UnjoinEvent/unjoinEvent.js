const config = require('./config.js');

module.exports = {
    'Test join event': function (client) {
        const users = [
            {
                username: "oli",
                password: "password",
            },
        ];
        
        const events = [
            {
                title: "testing event",
                // startDate: "2021\t03041030a",
                // endDate: "2021\t03041130a",
                // description: "Description",
                // location: "Mtl"
            }
        ]

        client.windowMaximize()

        //Login
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

        // //Create event
        // client
        //     .click(config.id.createEvent)
        //     .pause(config.time.pause)
        //     .setValue(config.id.eventTitle, events[0].title)
        //     .pause(config.time.pause)
        //     .setValue(config.id.eventStartDate, events[0].startDate)
        //     .pause(config.time.pause)
        //     .setValue(config.id.eventEndDate, events[0].endDate)
        //     .pause(config.time.pause)
        //     .setValue(config.id.eventDescription, events[0].description)
        //     .pause(config.time.pause)
        //     .setValue(config.id.eventLocation, events[0].location)
        //     .pause(config.time.pause)
        //     .click(config.id.createEventButton)
        //     .pause(config.time.pause)
        //     .waitForElementVisible('body', config.time.visible)

        // //Login with new account
        // client
        // .url(config.url)
        // .waitForElementVisible('body', config.time.visible)
        // .setValue(config.id.username, users[1].username)
        // .pause(config.time.pause)
        // .setValue(config.id.password, users[1].password)
        // .pause(config.time.pause)
        // .click(config.id.login)
        // .pause(config.time.pause)
        // .waitForElementVisible('body', config.time.visible)

        //Join Event
        client
        .click(config.id.joinEvent)
        .pause(config.time.pause)
        .setValue(config.id.eventSelect, events[0].title)
        .pause(config.time.pause)
        .click(config.id.joinEventButton)
        .pause(config.time.pause)
        .assert.containsText(config.id.success, "Successfully joined event")
        .pause(config.time.pause)
        .click("#closeJoinEvent")

        //Unjoin Event
        client
        .useXpath().click("//*[contains(text(), 'testing event')]")
        .useCss()
        .pause(config.time.pause)
        .assert.visible("#unjoinButton")
        .pause(config.time.pause)
        .click("#unjoinButton")
        .waitForElementVisible('body', config.time.visible)
        .pause(config.time.pause)
        .pause(config.time.pause)

        // //Login with old account
        // client
        // .url(config.url)
        // .waitForElementVisible('body', config.time.visible)
        // .setValue(config.id.username, users[0].username)
        // .pause(config.time.pause)
        // .setValue(config.id.password, users[0].password)
        // .pause(config.time.pause)
        // .click(config.id.login)
        // .pause(config.time.pause)
        // .waitForElementVisible('body', config.time.visible)

        // //Delete event
        // client
        // .useXpath().click("//*[contains(text(), '" + events[0].title + "')]")
        // .useCss()
        // .pause(config.time.pause)
        // .click(config.id.deleteEvent)
        // .pause(config.time.pause)
        // .click(config.id.deleteEventButton)
        // .pause(config.time.pause)
        // .waitForElementVisible('body', config.time.visible)

        client.end()
    },
}