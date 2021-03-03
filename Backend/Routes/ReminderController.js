const mongoose = require("mongoose");
const express = require("express");
const route = require("express").Router();
const verify = require("./VerifyToken");

const Student = require("../Models/student");
const Reminder = require("../Models/reminder");

// ===== add reminder of existing student =====
// ============================================
// TODO error handling
route.post("/addReminderToStudent", verify, async function (req, res) {
  const newReminder = new Reminder({
    title: req.body.title,
    description: req.body.description,
    reminderDate: req.body.reminderDate,
  });

  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }

  const studentName = req.body.username;

  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exist");
    }

    if (!err) {
      const studentReminders = student.reminders;

      studentReminders.push(newReminder);

      Student.updateOne(
        { username: studentName },
        { reminders: studentReminders },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send(student.reminders);
          }
        }
      );
    } else {
      res.send(err);
    }
  });
});

// ===== get reminders of existing student =====
// =========================================
route.get("/getStudentReminders", verify, function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  const studentName = req.body.username;
  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exists");
    }

    if (!err) {
      res.send(student.reminders);
    } else {
      res.send(err);
    }
  });
});

// ===== delete reminder of an existing student =====
// ==============================================
route.post("/deleteStudentReminder", verify, function (req, res) {
  const studentName = req.body.username;
  const reminderId = req.body.reminderId;
  console.log(reminderId);

  if (!studentName) {
    return res.status(400).send("Please provide a username");
  }
  if (!reminderId) {
    return res.status(400).send("Please provide a reminderId");
  }

  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      const studentReminders = student.reminders;
      console.log(studentReminders);

      var reminderToBeDeleted = null;
      studentReminders.forEach((reminder) => {
        if (reminder._id.toString() === reminderId.toString()) {
          reminderToBeDeleted = reminder;
        }
      });

      if (!reminderToBeDeleted) {
        return res.status(400).send("Reminder does not exist");
      }
      const index = studentReminders.indexOf(reminderToBeDeleted);

      studentReminders.splice(index, 1);

      Student.updateOne(
        { username: studentName },
        { reminders: studentReminders },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send(student.reminders);
          }
        }
      );
    } else {
      res.send(err);
    }
  });
});

// ===== update existing student reminder =====
// ========================================
route.post("/updateStudentReminder", verify, async function (req, res) {
  const newReminder = new Reminder({
    title: req.body.title,
    description: req.body.description,
    reminderDate: req.body.reminderDate,
  });
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.reminderId) {
    return res.status(400).send("Please provide an reminderId");
  }
  const studentName = req.body.username;
  const reminderId = req.body.reminderId;

  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exists");
    }

    if (!err) {
      const studentReminders = student.reminders;

      var reminderToBeDeleted;

      studentReminders.forEach((reminder) => {
        if (reminder._id.toString() === reminderId.toString()) {
          reminderToBeDeleted = reminder;
        }
      });

      if (!reminderToBeDeleted) {
        return res.status(400).send("Reminder does not exists");
      }
      const index = studentReminders.indexOf(reminderToBeDeleted);

      studentReminders.splice(index, 1, newReminder);

      Student.updateOne(
        { username: studentName },
        { reminders: studentReminders },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send(student.reminders);
          }
        }
      );
    } else {
      res.send(err);
    }
  });
});

module.exports = route;
