const config = {
    url: "http://127.0.0.1:8087/#/Login",
    destinationUrl_Signup: "http://127.0.0.1:8087/#/Signup",
    destinationUrl_Home: "http://127.0.0.1:8087/#/Home",
    name: "JoinEvent",
    id: {
        username: "#field_uname",
        password: "#field_password",
        login: "#login_button",
        createEvent: "#createEventButton",
        eventTitle: "#title-create-event",
        eventStartDate: "#startdate-create-event",
        eventEndDate: "#enddate-create-event",
        eventDescription: "#description-create-event",
        eventLocation: "#location-create-event",
        createEventButton: "#createeventbtn",
        joinEvent: "#joinEventButton",
        eventSelect: "#event",
        joinEventButton: "#btnjoinevent",
        success: "#success-join-event",
        deleteEvent: "#deleteButton",
        deleteEventButton: "#btndeleteevent"
    },
    time: {
        pause: 1500,
        visible: 1500
    }
}

module.exports = config;