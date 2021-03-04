const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Class = require("./Class");
const task = require("./task");
const reminder = require("./reminder");

const student = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
<<<<<<< HEAD
    required: true
=======
    required: true,
>>>>>>> dev
  },
  tasks: {
    type: Array,
    default: [],
    format: task,
  },
  classes: {
    type: Array,
    default: [],
    format: Class,
  },
<<<<<<< HEAD
  reminders:{
    type: Array,
    default:[],
    format: reminder
  }
=======
  reminders: {
    type: Array,
    default: [],
    format: reminder,
  },
>>>>>>> dev
});

student.pre("save", async function (next) {
  // hash password if the student instance is newly created
  if (this.isNew) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  }
});

module.exports = Student = mongoose.model("Students", student);
