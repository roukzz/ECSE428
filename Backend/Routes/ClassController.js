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
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
  });
  if (newClass.startTime > newClass.endTime) {
    return res.status(400).send("Start of class cannot be after end of class");
  }
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  Student.findOne({ username: req.body.username }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      const studentClasses = student.classes;
      let classTimeSlots = [];
      if (req.body.timeslots) {
        req.body.timeslots.forEach((element) => {
          let startDate = new Date(element.startTime);
          let endDate = new Date(element.endTime);
          const ruleStart = new RRule({
            freq: RRule.WEEKLY,
            dtstart: newClass.startTime,
            until: newClass.endTime,
            byweekday: RRuleDaySwitch(startDate.getDay()),
            byhour: startDate.getHours(),
            byminute: startDate.getMinutes(),
          });
          const ruleEnd = new RRule({
            freq: RRule.WEEKLY,
            dtstart: newClass.startTime,
            until: newClass.endTime,
            byweekday: RRuleDaySwitch(endDate.getDay()),
            byhour: endDate.getHours(),
            byminute: endDate.getMinutes(),
          });

          for (let i = 0; i < ruleStart.all().length; i++) {
            classTimeSlots.push(
              new Timeslot({
                startTime: ruleStart.all()[i],
                endTime: ruleEnd.all()[i],
                description: newClass.description,
                location: newClass.location,
              })
            );
          }
        });
      }
      newClass.timeslots = classTimeSlots;
      studentClasses.push(newClass);

      Student.updateOne(
        { username: req.body.username },
        { classes: studentClasses },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send(newClass);
          }
        }
      );
    } else {
      res.send(err);
    }
  });
});

route.post("/updateClass", verify, function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  Student.findOne({ username: req.body.username }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      let classIDIsValid = false;
      student.classes.forEach((element) => {
        if ((element.id = req.body.classID)) {
          classIDIsValid = true;
          element.title = req.body.title;
          element.description = req.body.description;
          element.startTime = req.body.startTime;
          element.endTime = req.body.endTime;
          element.location = req.body.location;
        }
      });
      if (!classIDIsValid) {
        return res.status(400).send("No class matches this ID");
      }
      Student.updateOne(
        { username: req.body.username },
        { classes: student.classes },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send(student.classes);
          }
        }
      );
    } else {
      res.send(err);
    }
  });
});

function RRuleDaySwitch(number) {
  let day;
  switch (number) {
    case 0:
      day = RRule.SU;
      break;
    case 1:
      day = RRule.MO;
      break;
    case 2:
      day = RRule.TU;
      break;
    case 3:
      day = RRule.WE;
      break;
    case 4:
      day = RRule.TH;
      break;
    case 5:
      day = RRule.FR;
      break;
    case 6:
      day = RRule.SA;
  }
  return day;
}

// TODO: Implement delete class

// TODO: Implement get class

// get class time_slots
route.get("/getClassTimeslots", verify, function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.classID) {
    return res.status(400).send("Please provide a classID");
  }
  let classID = req.body.classID;
  let studentName = req.body.username;
  let found = false;
  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      const studentClasses = student.classes;
      studentClasses.forEach((studentClass) => {
        if (studentClass._id.toString() === classID.toString()) {
          found = true;
          res.send(studentClass.timeslots);
        }
      });
    }
    if (!found) {
      res.status(400).send("Class not found");
    }
  });
});

// TODO: Add timeslots to class
route.post("/addTimeslotToClass", verify, function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.classID) {
    return res.status(400).send("Please provide a class ID");
  }
  if (!req.body.timeslot) {
    return res.status(400).send("Please provide a timeslot");
  }
  if (!req.body.timeslot.startTime) {
    return res.status(400).send("Please provide a timeslot start time");
  }
  if (!req.body.timeslot.endTime) {
    return res.status(400).send("Please provide a timeslot end time");
  }
  if (!Date.parse(req.body.timeslot.startTime)) {
    return res
      .status(400)
      .send("Please provide a valid startTime in UTC format");
  }
  if (!Date.parse(req.body.timeslot.endTime)) {
    return res.status(400).send("Please provide a valid endTime in UTC format");
  }
  let classID = req.body.classID;
  let studentName = req.body.username;
  let found = false;
  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      const studentClasses = student.classes;
      studentClasses.forEach((studentClass) => {
        if (studentClass._id.toString() === classID.toString()) {
          found = true;
          const timeslots = studentClass.timeslots;
          const newTimeslot = new Timeslot({
            startTime: req.body.timeslot.startTime,
            endTime: req.body.timeslot.endTime,
            description: req.body.timeslot.description,
            location: req.body.timeslot.location,
          });
          timeslots.push(newTimeslot);
          studentClass.timeslots = timeslots;
          Student.updateOne(
            { username: studentName },
            { classes: studentClasses },
            function (err) {
              if (err) {
                return res.status(500).send(err);
              } else {
                res.send(timeslots);
              }
            }
          );
        }
      });
    } else {
      res.status(500).send(err);
    }
    if (!found) {
      res.status(400).send("Class not found");
    }
  });
});

// Update existing timeslots of a classes

// Delete timeslot of a classes

module.exports = route;
