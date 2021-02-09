const mongoose = require("mongoose");
const Task = require("./task");

const student = new mongoose.Schema({
  username: {
    type: String,
  },
  tasks: {
    type: [],
  },
});

module.exports = Student = mongoose.model("Students", student);
