const express = require("express");
const mongoose = require("mongoose");
const Student = require("../Models/student");
const Task = require("../Models/task");
const route = express.Router();
const verify = require("./VerifyToken");
const Class = require("../Models/Class");
const Timeslot = require("../Models/timeslot");

const { RRule, RRuleSet, rrulestr } = require("rrule");

// ===== get classes of existing student =====
// ===========================================
route.get("/getStudentClasses", verify, function (req, res) {
  // check for username
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  const studentName = req.body.username;
  // find student
  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exists");
    }
    if (!err) {
      res.send(student.classes);
    } else {
      res.send(err);
    }
  });
});

// ===== add new class to existing student =====
// =============================================
route.post("/addNewClass", verify, function (req, res) {
  // err handlings
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.title) {
    return res.status(400).send("Please provide a class title");
  }
  if (!req.body.startTime) {
    return res.status(400).send("Please provide a class start time");
  }
  if (!req.body.endTime) {
    return res.status(400).send("Please provide a class end time");
  }
  if (!Date.parse(req.body.startTime)) {
    return res
      .status(400)
      .send("Please provide a valid startTime in UTC format");
  }
  if (!Date.parse(req.body.endTime)) {
    return res.status(400).send("Please provide a valid endTime in UTC format");
  }
  // create new class
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

route.post("/addPeriodToClass", verify, function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (req.body.startTime > req.body.endTime) {
    return res.status(400).send("Start of class cannot be after end of class");
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
          const startPeriod = new Date(req.body.startTime);
          const endPeriod = new Date(req.body.endTime);
          const ruleStart = new RRule({
            freq: RRule.WEEKLY,
            dtstart: element.startTime,
            until: element.endTime,
            byweekday: RRuleDaySwitch(startPeriod.getDay()),
            byhour: startPeriod.getHours(),
            byminute: startPeriod.getMinutes(),
          });
          const ruleEnd = new RRule({
            freq: RRule.WEEKLY,
            dtstart: element.startTime,
            until: element.endTime,
            byweekday: RRuleDaySwitch(endPeriod.getDay()),
            byhour: endPeriod.getHours(),
            byminute: endPeriod.getMinutes(),
          });
          for (let i = 0; i < ruleStart.all().length; i++) {
            element.timeslots.push(
              new Timeslot({
                startTime: ruleStart.all()[i],
                endTime: ruleEnd.all()[i],
                description: element.description,
                location: element.location,
              })
            );
          }
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

route.post("/deleteClass", verify, function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  Student.findOne({ username: req.body.username }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exist");
    }
    if (!err) {
      let classIDIsValid = false;

      for (let i = 0; i < student.classes.length; i++) {
        if ((student.classes[i].id = req.body.classID)) {
          classIDIsValid = true;
          student.classes.splice(i, 1);
        }
      }
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

// get class time_slots
route.post("/getClassTimeslots", verify, function (req, res) {
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

//Add timeslots to class
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
route.post("/updateTimeSlotClass", verify, async function (req, res) {
  if (!req.body.username) {
    return res.status(400).send("Please provide an username");
  }
  if (!req.body.timeslotID) {
    return res.status(400).send("Please provide a Time Slot ID");
  }
  if (!req.body.classID) {
    return res.status(400).send("Please provide a class ID");
  }

  if (!req.body.startTime) {
    return res.status(400).send("Please provide a timeslot start time");
  }
  if (!req.body.endTime) {
    return res.status(400).send("Please provide a timeslot end time");
  }
  if (!Date.parse(req.body.startTime)) {
    return res
      .status(400)
      .send("Please provide a valid startTime in UTC format");
  }
  if (!Date.parse(req.body.endTime)) {
    return res.status(400).send("Please provide a valid endTime in UTC format");
  }

  const newTimeSlot = new TimeSlot({
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    description: req.body.description,
    location: req.body.location,
  });

  const studentName = req.body.username;
  const timeSlotId = req.body.timeslotID;
  const classID = req.body.classID;

  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exists");
    }

    if (!err) {
      const studentClasses = student.classes;
      var timeSlotToBeDeleted;
      var timeSlotList;
      studentClasses.forEach((studentClass) => {
        if (studentClass._id.toString() === classID.toString()) {
          timeSlotList = studentClass.timeslots;
          studentClass.timeslots.forEach((timeslot) => {
            if (timeslot._id.toString() === timeSlotId.toString()) {
              timeSlotToBeDeleted = timeslot;
            }
          });
        }
      });
      if (!timeSlotToBeDeleted) {
        return res.status(400).send("Timeslot does not exist");
      }
      const index = timeSlotList.indexOf(timeSlotToBeDeleted);
      timeSlotList.splice(index, 1, newTimeSlot);
      studentClasses.forEach((studentClass) => {
        if (studentClass._id.toString() === classID.toString()) {
          studentClass.timeslots = timeSlotList;
        }
      });

      Student.updateOne(
        { username: studentName },
        { classes: studentClasses },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send(timeSlotList);
          }
        }
      );
    } else {
      res.status(500).send(err);
    }
  });
});

// Delete timeslot of a classes
// TODO: FIX THIS
route.post("/deleteTimeSlotClass", verify, async function (req, res) {
  if (!req.body.timeSID) {
    return res.status(400).send("Please provide a Time Slot ID");
  }
  if (!req.body.classID) {
    return res.status(400).send("Please provide a class ID");
  }

  const studentName = req.body.username;
  const timeSlotId = req.body.timeSID;

  Student.findOne({ username: studentName }, function (err, student) {
    if (!student) {
      return res.status(400).send("Student does not exists");
    }

    var idx = -1;
    var idx2 = -1;
    var i, j;
    for (i = 0; i < student.classes.length; i++) {
      for (j = 0; j < student.classes[i].timeslots.length; j++) {
        if (student.classes[i].timeslots[j]._id == timeSlotId) {
          idx = i;
          idx2 = j;
        }
      }
    }

    if (idx == -1) {
      return res.status(400).send("Time Slot does not exist");
    }

    if (!err) {
      const classT = student.classes[idx];
      if (!classT.timeslots) {
        return res.status(400).send("TimeSlot does not exists");
      }
      classT.timeslots.splice(idx2, 1);
      Student.updateOne(
        { username: studentName },
        { classes: classT },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send(student.classes[idx]);
          }
        }
      );
    } else {
      res.send(err);
    }
  });
});

module.exports = route;
