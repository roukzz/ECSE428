const express = require("express");
const mongoose = require("mongoose");
const Student = require("../Models/student");
const Task = require("../Models/task");
const route = express.Router();
const verify = require("./VerifyToken");
const Class = require("../Models/Class");
const Timeslot = require("../Models/timeslot");

const { RRule, RRuleSet, rrulestr } = require("rrule");

route.post("/addNewClass", verify, function (req, res) {
  const newClass = new Class({
    title: req.body.title,
    description: req.body.description,
    startTime: new Date(req.body.startTime),
    endTime: new Date(req.body.endTime),
    location: req.body.location,
  });

  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  Student.findOne({ username: req.body.username }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      const studentClasses = student.classes;
      let classTimeSlots;
      if (req.body.timeslots) {
        req.body.timeslots.forEach((element) => {
          let startDate = new Date(element.startTime);
          let endDate = new Date(element.endTime);
          console.log(startDate);
          console.log(endDate);
          const ruleStart = new RRule({
            freq: RRule.WEEKLY,
            dtstart: newClass.startTime,
            until: newClass.endTime,
            byweekday: startDate.getDay(),
            byhour: startDate.getHours(),
            byminute: startDate.getMinutes(),
          });
          const ruleEnd = new RRule({
            freq: RRule.WEEKLY,
            dtstart: newClass.startTime,
            until: newClass.endTime,
            byweekday: endDate.getDay(),
            byhour: endDate.getHours(),
            byminute: endDate.getMinutes(),
          });
          for (let i = 0; i < ruleStart.length; i++) {
            classTimeSlots.push(
              new Timeslot({
                startTime: ruleStart[0],
                endTime: ruleEnd[0],
                description: newClass.description,
                location: newClass.location,
              })
            );
          }
        });
      }

      studentClasses.push(newClass);

      Student.updateOne(
        { username: req.body.username },
        { classes: studentClasses },
        { timeslots: classTimeSlots },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send(studentClasses);
          }
        }
      );
    } else {
      res.send(err);
    }
  });
});
module.exports = route;
