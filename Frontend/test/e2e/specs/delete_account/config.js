const config = {
  name: "Delete Account",
  urls: {
    login: "http://127.0.0.1:8087/#/Login",
    signup: "http://127.0.0.1:8087/#/Signup",
    home: "http://127.0.0.1:8087/#/Home"
  },
  id: {
    signup_nonPartner: "#nonPartner",
    signup_name: "#name",
    signup_email: "#email",
    signup_psw: "#psw",
    signup_pswRepeat: "#pswRepeat",
    signup_btn: "#signupbtn",
    login_username: "#field_uname",
    login_password: "#field_password",
    login: "#login_button",
    login_signup: "#create_account",
    settings: "#dropdown-1",
    profile: "#profileButton",
    delete_acc: "#deleteAccount"
  },
  time: {
    pause: 1500,
    visible: 1500
  }
}

module.exports = config;