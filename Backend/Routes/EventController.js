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
          error = "error";
        }
        if (
          (newEvent.startTime > element.startTime &&
            newEvent.startTime < element.endTime) ||
          (newEvent.endTime > element.startTime &&
            newEvent.endTime < element.endTime) ||
          (newEvent.startTime < element.startTime &&
            newEvent.endTime > element.endTime)
        ) {
          error = "error";
        }
      }
    }
  });

  if (error === "error") {
    return res.status(400).send("Error");
  }

  const savedEvent = await newEvent.save();
  res.send(savedEvent);
});
module.exports = route;
