
const mongoose = require("mongoose");
const express = require("express");
const route = require("express").Router();
const verify = require("./VerifyToken");

const Student = require("../Models/student");
const Reminder = require("../Models/reminder");


//===== add a reminder to an existing student =====
//=============================================

// route.post("/addReminderToStudent", verify, async function (req, res) {
//
//   const newReminder = new Reminder({
//     title: req.body.title,
//     description: req.body.description,
//     reminderDate: req.body.reminderDate,
//
//   });
//
//   if (!req.body.username) {
//     return res.status(400).send("Please provide an username");
//   }
//
//   const studentName = req.body.username;
//   // console.log("student Name is : "+ studentName);
//
//   Student.findOne({ username: studentName }, function (err, student) {
//     //console.log("found student name  :" + student);
//     if (!student) {
//       return res.status(400).send("Student does not exist");
//     }
//
//     if (!err) {
//       const studentReminders = student.reminders;
//       //console.log("tasks" + studentTasks)
//
//       studentReminders.push(newReminder);
//       // console.log("new tasks" + studentTasks)
//
//       Student.updateOne(
//         { username: studentName },
//         { reminders: studentReminders },
//         function (err) {
//           if (err) {
//             console.log(err);
//           } else {
//             // console.log(
//             //   "tasks of student: " + studentName + " has been updated"
//             // );
//             res.send(student.reminders);
//           }
//         }
//       );
//     } else {
//       //console.log("student not found");
//       res.send(err);
//     }
//   });
// });
