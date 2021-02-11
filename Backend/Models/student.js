const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

student.pre('save', async function(next) {
    
  // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

module.exports = Student = mongoose.model("Students", student);
