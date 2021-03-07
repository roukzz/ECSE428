const nodemailer = require("nodemailer");
const cron = require("node-cron");

const sendReminders = async () => {
  // email message options
  const mailOptions = {
    from: "mySchedule.ecse428@gmail.com",
    to: "putemailhere@gmail.com",
    subject: "REMINDER TITLE!",
    text: "reminder description",
  };

  // email transport configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mySchedule.ecse428@gmail.com",
      pass: "ecse.428",
    },
  });

  // send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendReminders;
