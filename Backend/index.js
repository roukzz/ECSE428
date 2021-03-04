const connectDB = require("./DBConnection/connection");
const app = require("./server");
const sendReminders = require("./Mailing/mailer");

connectDB();
// sendReminders();

const port = 3000;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
