const connectDB = require("./DBConnection/connection");
const app = require('./server');
const notifier = require("./notifier");

connectDB();

notifier();

const port = 3000;



app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
