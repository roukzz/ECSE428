const config = {
  url: "http://127.0.0.1:8087/#/Signup",
  destinationUrl: "http://127.0.0.1:8087/#/Home",
  name: "Registration",
  id: {
    nonPartner: "#nonPartner",
    partner: "#partner",
    name: "#name",
    email: "#email",
    psw: "#psw",
    pswRepeat: "#pswRepeat",
    school: "#school",
    studentID: "#studentID",
    signupbtn: "#signupbtn",
    error: "#error",
    accountAndSettings: "#dropdown-1",
    profileButton: "#profileButton",
    deleteAccount: "#deleteAccount"
  },
  time: {
    pause: 1500,
    visible: 1500
  }
}

module.exports = config;
