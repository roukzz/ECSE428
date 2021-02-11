const express = require("express");
const mongoose = require("mongoose");
const Student = require("../Models/student");
const Task = require("../Models/task");
const route = express.Router();
const verify = require("./VerifyToken");

// return custom status: res.json({status : "ok"})

// ===== get a student by username =====
// =====================================
route.get("/getStudentByUsername", verify, function (req, res) {
  Student.findOne({ username: req.body.username }, function (err, student) {
    if (!err) {
      res.send(student);
    } else {
      res.send(err);
    }
  });
});

// ===== add a task to an existing student =====
// =============================================
route.post("/addTaskToStudent", verify, async function (req, res) {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
  });

  const studentName = req.body.username;
  // console.log("student Name is : "+ studentName);

  Student.findOne({ username: studentName }, function (err, student) {
    //console.log("found student name  :" + student);

    if (!err) {
      const studentTasks = student.tasks;
      //console.log("tasks" + studentTasks)

      studentTasks.push(newTask);
      // console.log("new tasks" + studentTasks)

      Student.updateOne(
        { username: studentName },
        { tasks: studentTasks },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(
              "tasks of student: " + studentName + " has been updated"
            );
          }
        }
      );
      res.send("task successfuly added to student");
    } else {
      //console.log("student not found");
      res.send(err);
    }
  });
});

// ===== get tasks of existing student =====
// =========================================
route.get("/getStudentTasks", verify, function (req, res) {
  const studentName = req.body.username;
  Student.findOne({ username: studentName }, function (err, student) {
    console.log("found student name  :" + student);
    if (!err) {
      res.send(student.tasks);
    } else {
      res.send(err);
    }
  });
});

// ===== delete task of an existing student =====
// ==============================================
route.delete("/deleteStudentTask", verify, function (req, res) {
  const taskName = req.body.title;
  const studentName = req.body.username;

  Student.findOne({ username: studentName }, function (err, student) {
    if (!err) {
      const studentTasks = student.tasks;

      const task = studentTasks.find((element) => element.title === taskName);

      const index = studentTasks.indexOf(task);
      console.log(index);
      if (index > -1) {
        studentTasks.splice(index, 1);
        console.log("Updated tasks" + studentTasks);
        Student.updateOne(
          { username: studentName },
          { tasks: studentTasks },
          function (err) {
            if (err) {
              res.send(err);
            } else {
              res.send("task has been deleted");
            }
          }
        );
      } else {
        res.send("task doesn't exist");
      }
    } else {
      res.send(err);
    }
  });
});

module.exports = route;