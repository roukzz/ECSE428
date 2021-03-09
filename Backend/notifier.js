
const nodemailer = require('nodemailer');
//const route = express.Router();
const express = require("express");
const mongoose = require("mongoose");


module.exports = sendEmail;

function sendEmail(){

  //email message option

  const mailOptions = {
    from: 'mySchedule.ecse428@gmail.com',
    to: 'arabfarouk@hotmail.com',
    subject:' reminder from mySchedule,',
    text: 'reminder for task 2'
  };

  // email transporter

  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth : {
      user:'mySchedule.ecse428@gmail.com',
      pass: 'ecse.428'
    }
  });

  //send email

  transporter.sendMail(mailOptions, (error,info) => {
    if (error){
      console.log(error);
    } else {
      console.log('Email send: '+ info.response);
    }

  });




  //console.log("SEND EMAIL");
}
