const express = require("express");
const mongoose = require("mongoose");
const Student = require("../Models/student");
const route = express.Router();

// create a new student
route.post("/createStudent", async function (req, res) {
  const newStudent = new Student({
    username: req.body.username,
    tasks: [],
  });

  await newStudent.save(function (err) {
    if (!err) {
      res.send("student successuly added");
    } else {
      res.send(err);
    }
  });
});

// get a student by username
route.get("/getStudentByUsername", function (req, res) {
  Student.findOne({ username: req.body.username }, function (err, student) {
    if (!err) {
      res.send(student);
    } else {
      res.send(err);
    }
  });
});
module.exports = route;
