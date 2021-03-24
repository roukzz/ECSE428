const express = require("express");
const mongoose = require("mongoose");
const Event = require("../Models/event");
const route = express.Router();
const verify = require("./VerifyToken");

route.post("/createNewEvent", verify, async function (req, res) {
  const newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    creatorID: req.body.creatorID,
    attendeesIDs: [],
  });
  if (newEvent.startTime > newEvent.endTime) {
    return res.status(400).send("Start of class cannot be after end of class");
  }
  if (!req.body.creatorID) {
    return res.status(400).send("Please provide a creator ID");
  }
  let error; // If  there is an error, this value becomes equal to error and then doesnt send the response
  await Event.find({ creatorID: newEvent.creatorID }, function (err, docs) {
    //TIL this is an async method. Why is this an async method. That took too much time.
    if (err) {
      console.log(err);
      assert.fail();
    } else {
      for (let i = 0; i < docs.length; i++) {
        let element = docs[i];
        if (element.title == newEvent.title) {
          error = "Title is already used!";
        }
        if (
          (newEvent.startTime > element.startTime &&
            newEvent.startTime < element.endTime) ||
          (newEvent.endTime > element.startTime &&
            newEvent.endTime < element.endTime) ||
          (newEvent.startTime < element.startTime &&
            newEvent.endTime > element.endTime)
        ) {
          error =
            "This event is overlapping in its time with another created by you!";
        }
      }
    }
  });

  if (error) {
    return res.status(400).send(error);
  }

  const savedEvent = await newEvent.save();
  res.send(savedEvent);
});

route.post("/getAllEvents", verify, async function (req, res) {
  Event.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      assert.fail();
    } else {
      return res.send(docs);
    }
  });
});
route.post("/joinEvent", verify, async function (req, res) {
  Event.find({ _id: req.body.eventID }, function (err, docs) {
    if (err) {
      console.log(err);
      assert.fail();
    } else {
      docs[0].attendeesIDs.push(req.body.attendeeID);
      Event.updateOne(
        { _id: req.body.eventID },
        { attendeesIDs: docs[0].attendeesIDs },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Got in update");
            res.send(docs[0].attendeesIDs);
          }
        }
      );
    }
  });
});

route.post("/getStudentEvents", verify, async function (req, res) {
  Event.find({ creatorID: req.body.creatorID }, function (err, docs) {
    if (err) {
      console.log(err);
      assert.fail();
    } else {
      return res.send(docs);
    }
  });
});
route.post("/getAttendedEvents", verify, async function (req, res) {
  Event.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      assert.fail();
    } else {
      let attendedEvents = [];
      docs.forEach((event) => {
        if (event.attendeesIDs.includes(req.body.attendeeID)) {
          attendedEvents.push(event);
        }
      });
      if (attendedEvents) {
        return res.send(attendedEvents);
      } else {
        return res
          .status(400)
          .send("No events are being attended by this individual");
      }
    }
  });
});
module.exports = route;
