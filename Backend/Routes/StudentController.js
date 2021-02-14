const express = require("express");
const mongoose = require("mongoose");
const Student = require("../Models/student");
const Task = require("../Models/task");
const route = express.Router();
const verify = require("./VerifyToken");

// return custom status: res.json({status : "ok"})

// ===== get a student by username =====
// =====================================
route.post("/getStudentByUsername", verify, function (req, res) {
  if (!req.body.username){
    return res.status(400).send("Please provide an username")
  }
  Student.findOne({ username: req.body.username }, function (err, student) {
    if (!student){
      return res.status(400).send("Student does not exist")
    }
    if (!err) {
      res.send(student);
    } else {
      res.send(err);
    }
  });
});

// ===== delete an existing student =====
// ======================================
route.post("/deleteStudentAccount", verify, async function (req, res) {
  if (!req.body.username){
    return res.status(400).send("Please provide an username")
  }
  const studentName = req.body.username;

  // checking if student is already in the database
  const studentExist = await Student.findOne({ username: req.body.username });
  if (!studentExist) {
    return res.status(400).send("Student does not exist");
  }
  Student.deleteOne({ username: studentName }, function (err, student) {
    if (err) {
      res.send(err);
    } else {
      res.send("Student account has been deleted");
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

  if (!req.body.username){
    return res.status(400).send("Please provide an username")
  }

  const studentName = req.body.username;
  // console.log("student Name is : "+ studentName);

  Student.findOne({ username: studentName }, function (err, student) {
    //console.log("found student name  :" + student);
    if (!student){
      return res.status(400).send("Student does not exist")
    }

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
            // console.log(
            //   "tasks of student: " + studentName + " has been updated"
            // );
            res.send(student.tasks);
          }
        }
      );
    } else {
      //console.log("student not found");
      res.send(err);
    }
  });
});

// ===== update existing student task =====
// ========================================
route.post("/updateStudentTask", verify, async function (req, res) {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
  });
  if (!req.body.username){
    return res.status(400).send("Please provide an username")
  }
  if (!req.body.taskId){
    return res.status(400).send("Please provide an taskId")
  }
  const studentName = req.body.username;
  const taskId = req.body.taskId;
  
  Student.findOne({ username: studentName }, function (err, student) {
    //console.log("found student name  :" + student);
    if (!student){
      return res.status(400).send("Student does not exists")
    }

    if (!err) {
      const studentTasks = student.tasks;
      // console.log("tasks" + studentTasks);

      var taskToBeDeleted;

      studentTasks.forEach((task) => {
        if (task._id.toString() === taskId.toString()) {
          taskToBeDeleted = task;
        }
      });

      if (!taskToBeDeleted){
        return res.status(400).send("Task does not exists")
      }
      const index = studentTasks.indexOf(taskToBeDeleted);
      // console.log(index);
      studentTasks.splice(index, 1, newTask);
      // console.log(studentTasks);

      Student.updateOne(
        { username: studentName },
        { tasks: studentTasks },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send(student.tasks);
          }
        }
      );
    } else {
      //console.log("student not found");
      res.send(err);
    }
  });
});

// ===== get tasks of existing student =====
// =========================================
route.get("/getStudentTasks", verify, function (req, res) {
  if (!req.body.username){
    return res.status(400).send("Please provide an username")
  }
  const studentName = req.body.username;
  Student.findOne({ username: studentName }, function (err, student) {
    if (!student){
      return res.status(400).send("Student does not exists")
    }
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
route.post("/deleteStudentTask", verify, function (req, res) {
  const studentName = req.body.username;
  const taskId = req.body.taskId;

  if (!studentName) {
    return res.status(400).send("Please provide a username")
  }
  if (!taskId){
    return res.status(400).send("Please provide a taskId")
  }

  Student.findOne({ username: studentName }, function (err, student) {
    //console.log("found student name  :" + student);
    if (!student){
      return res.status(400).send("Student does not exist")
    }
    if (!err) {
      const studentTasks = student.tasks;
      //console.log("tasks" + studentTasks);

      var taskToBeDeleted = null;
      studentTasks.forEach((task) => {
        if (task._id.toString() === taskId.toString()) {
          taskToBeDeleted = task;
        }
      });

      if (!taskToBeDeleted){
        return res.status(400).send("Task does not exist")
      }
      const index = studentTasks.indexOf(taskToBeDeleted);
      //console.log(index);
      studentTasks.splice(index, 1);
      // console.log(studentTasks);

      Student.updateOne(
        { username: studentName },
        { tasks: studentTasks },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            // console.log(
            //   "tasks of student: " + studentName + " has been updated"
            // );
            res.send(student.tasks);
          }
        }
      );
    } else {
      //console.log("student not found");
      res.send(err);
    }
  });
});

module.exports = route;
