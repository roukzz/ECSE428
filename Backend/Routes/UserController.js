const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/User");
const route = express.Router();

route.post("/", async (req, res) => {
  const { email, password } = req.body;
  let user = {};
  user.email = email;
  user.password = password;
  let userModel = new User(user);
  await userModel.save();
  res.json(userModel);
});

module.exports = route;
