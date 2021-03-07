const config = {
  name: "Delete Account",
  urls: {
    login: "http://127.0.0.1:8087/#/Login",
    signup: "http://127.0.0.1:8087/#/Signup",
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
      createTask: "#createTaskButton",
      createTimeSlot: "#createTimeSlotButton",
      timeSlotWidget:{
        taskForTimeSlot : "taskForTimeSlot",
        createbtnTimeSlot : "#createbtnTimeSlot",
        startTime: "#startTime",
        endTime: "#endTime",
        descriptionTimeSlot : "#descriptionTimeSlot",
        locationTimeSlot : "#locationTimeSlot"
      },
      deleteTask: "#deleteTaskButton",
      description: "#description",
      deadline : "#deadline",
      title : "#title",
      titleEdit: "#titleEdit",
      descriptionEdit: "#descriptionEdit",
      create: "#createbtn",
      delete: "#btndelete",
      newTask: "#task._id"
  },
  time: {
    pause: 1500,
    visible: 1500
  }
}

module.exports = config;