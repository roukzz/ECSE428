const config = {
  name: "Test CRUD Class",
  urls: {
    login: "http://127.0.0.1:8087/#/Login",
    home: "http://127.0.0.1:8087/#/Home"
  },
  id: {
    logo: "#logo",
    intro_text: "#login_intro_text",
    form: "#login_form",
    fields: "#login_fields",
    error: "#error_msg",
    username: "#field_uname",
    password: "#field_password",
    recovery: "#password_recovery",
    login: "#login_button",
    signup: "#create_account",
    monthInput: "#month_input",
    createEvent: "#createEventButton",
    createEventPopup : {
      title: "#title-create-event",
      start: "#startdate-create-event",
      end: "#enddate-create-event",
      description: "#description-create-event",
      location: "#location-create-event",
      create: "#createeventbtn"
    },
    editEventPopup : {
      title: "#title-edit-event",
      start: "#startdate-edit-event",
      end: "#enddate-edit-event",
      description: "#description-edit-event",
      location: "#location-edit-event",
      edit: "#editeventbtn"
    }
  },
  time: {
    pause: 1500,
    visible: 1500
  }
}

module.exports = config;