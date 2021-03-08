const config = {
  name: "CRUD Class",
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
    createClass: "#createClassButton",
    createClassPopup : {
      classname: "#createclass-classname",
      start: "#createclass-startdate",
      end: "#createclass-enddate",
      description: "#createclass-description",
      location: "#createclass-location",
      create: "#createclassbtn"
    },
    editClassPopup : {
      classname: "#editclass-classname",
      start: "#editclass-startdate",
      end: "#editclass-enddate",
      description: "#editclass-description",
      location: "#editclass-location",
      edit: "#editclassbtn"
    }
  },
  time: {
    pause: 1500,
    visible: 1500
  }
}

module.exports = config;