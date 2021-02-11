const mongoose = require("mongoose");

const student = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array,
    default: [],
  },
});

module.exports = Student = mongoose.model("Students", student);
