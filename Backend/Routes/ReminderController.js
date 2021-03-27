const mongoose = require("mongoose");
const express = require("express");
const route = require("express").Router();
const verify = require("./VerifyToken");

const Student = require("../Models/student");
const Reminder = require("../Models/reminder");

// ===== add reminder of existing student =====
// ============================================
route.post("/addReminderToStudent", verify, async function (req, res) {
  // err handlings
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.title) {
    return res.status(400).send("Please provide a reminder title");
  }
  if (!req.body.reminderDate) {
    return res.status(400).send("Please provide a reminder date");
  }
  if (!Date.parse(req.body.reminderDate)) {
    return res
      .status(400)
      .send("Please provide a valid reminder date: wrong format");
  }
  try {
    var inputDate = new Date(req.body.reminderDate);
    if (isDateBeforeToday(inputDate)) {
      return res
        .status(400)
        .send(
          "Please provide a valid reminder date: reminder date is before today"
        );
    }
  } catch (error) {
    return res
      .status(400)
      .send("Please provide a valid reminder date: wrong format");
  }

  // create a new reminder
  const newReminder = new Reminder({
    title: req.body.title,
    description: req.body.description,
    reminderDate: req.body.reminderDate,
    priority: req.body.priority
  });

  const studentName = req.body.username;

  Student.findOne({ username: studentName }, function (err, student) {
    // student does not exist
    if (!student) {
      return res.status(400).send("Student does not exist");
    }

    if (!err) {
      const studentReminders = student.reminders;
      // append new reminder to existing reminder list
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
  // err handlings

  const studentName = req.body.username;
  const reminderId = req.body.reminderId;

  Student.findOne({ username: studentName }, function (err, student) {
    // student does not exist
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      const studentReminders = student.reminders;
      var reminderToBeDeleted = null;
      studentReminders.forEach((reminder) => {
        if (reminder._id.toString() === reminderId.toString()) {
          reminderToBeDeleted = reminder;
        }
      });

      // reminderToBeDeleted does not exist
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
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.reminderId) {
    return res.status(400).send("Please provide an reminderId");
  }
  if (!req.body.title) {
    return res.status(400).send("Please provide a reminder title");
  }
  if (!Date.parse(req.body.reminderDate)) {
    return res
      .status(400)
      .send("Please provide a valid reminder date: wrong format");
  }
  try {
    var inputDate = new Date(req.body.reminderDate);
    if (isDateBeforeToday(inputDate)) {
      return res
        .status(400)
        .send(
          "Please provide a valid reminder date: reminder date is before today"
        );
    }
  } catch (error) {
    return res
      .status(400)
      .send(
        "Please provide a valid reminder date: reminder date format is wrong"
      );
  }

  const newReminder = new Reminder({
    title: req.body.title,
    description: req.body.description,
    reminderDate: req.body.reminderDate,
    priority: req.body.priority
  });

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

function isDateBeforeToday(date) {
  return new Date(date) < new Date(new Date());
}

module.exports = route;
