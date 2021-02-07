const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = User = mongoose.model("Users", user);
