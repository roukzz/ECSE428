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
      signup: "#create_account",
      createTask: "#createTaskButton",
      updateTask: "#editTaskButton",
      deleteTask: "#deleteTaskButton",
      title: "#title",
      description: "#description",
      deadline : "#deadline",
      titleEdit: "#titleEdit",
      descriptionEdit: "#descriptionEdit",
      create: "#createbtn",
      update: "#updateChanges",
      delete: "#btndelete",
      newTask: "#task._id"
    },
    time: {
      pause: 1500,
      visible: 1500
    }
  }

  module.exports = config;