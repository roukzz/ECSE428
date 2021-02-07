const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./DBConnection/connection");
require("dotenv").config();

connectDB();

const { auth } = require("express-openid-connect");
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged In" : "Logged out");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

// User test route
app.use("/api/createUser", require("./Routes/UserController"));
