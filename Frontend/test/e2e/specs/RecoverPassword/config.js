const config = {
    url: "http://127.0.0.1:8087/#/RecoverPassword",
    destinationUrl_Signup: "http://127.0.0.1:8087/#/Signup",
    destinationUrl_Home: "http://127.0.0.1:8087/#/Home",
    name: "RecoverPassword",
    id: {
        name: "#name",
        email: "#email",
        recover: "#recoverbtn",
        success: "#success",
        error: "#error"
    },
    time: {
        pause: 1500,
        visible: 1500
    }
}

module.exports = config;