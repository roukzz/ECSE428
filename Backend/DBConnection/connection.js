const mongoose = require("mongoose");

const URI =
  "mongodb+srv://dbUser:dbUser@cluster0.dl88w.mongodb.net/mySchedule_dev?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("db connected!");
};

module.exports = connectDB;
