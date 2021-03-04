const connectDB = require("./DBConnection/connection");
<<<<<<< HEAD
const app = require('./server');
const notifier = require("./notifier");
=======
const app = require("./server");
const sendReminders = require("./Mailing/mailer");
>>>>>>> dev

connectDB();
// sendReminders();

notifier();

const port = 3000;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
