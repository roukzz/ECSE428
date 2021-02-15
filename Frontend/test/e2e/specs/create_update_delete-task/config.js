const config = {
    url: "http://127.0.0.1:8087/#/Login",
    destinationUrl_Signup: "http://127.0.0.1:8087/#/Signup",
    destinationUrl_Home: "http://127.0.0.1:8087/#/Home",
    name: "Login",
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
      signup: "#create_account"
    },
    name: "Home",
    id: {
      createTask: "#createTaskButton",
      updateTask: "#",
      deleteTask: "#",
      title: "#title",
      description: "#description",
      titleEdit: "#titleEdit",
      descriptionEdit: "#descriptionEdit",
      create: "#createbtn",
      newTask: "#arbitrarytitle",

    },
    time: {
      pause: 1500,
      visible: 1500
    }
  }

  module.exports = config;