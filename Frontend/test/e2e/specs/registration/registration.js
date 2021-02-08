const config = require('./config.js');

module.exports = {
  'Test add default users': function (client) {
    const registrations = [{
      name: 'max ba',
      email: 'existing@hotmail.com',
      psw: 'qxt54237568',
      pswRepeat: 'qxt54237568',
      school: null,
      studentID: null
    },
    {
        name: 'bal wa',
        email: 'existing2@hotmail.com',
        psw: 'kgw124003952',
        pswRepeat: 'kgw124003952',
        school: null,
        studentID: null
    }];

    for(var i = 0; i < 2; i++){
        client
      .url(config.url)
      .waitForElementVisible('body', config.time.visible)
      .assert.visible(config.id.nonPartner)
      .click(config.id.nonPartner)
      .pause(config.time.pause)
      .assert.visible(config.id.name)
      .setValue(config.id.name, registrations[i].name)
      .pause(config.time.pause)
      .assert.visible(config.id.email)
      .setValue(config.id.email, registrations[i].email)
      .pause(config.time.pause)
      .assert.visible(config.id.psw)
      .setValue(config.id.psw, registrations[i].psw)
      .pause(config.time.pause)
      .assert.visible(config.id.pswRepeat)
      .setValue(config.id.pswRepeat, registrations[i].pswRepeat)
      .pause(config.time.pause)
      .click(config.id.signupbtn)
      .pause(config.time.pause)
    }
    client
      .end();
  },
  'Test valid email and valid password': function (client) {
    const registrations = [{
        name: 'mad ba',
        email: 'okhello@hotmail.com',
        psw: 'qxt54237568',
        pswRepeat: 'qxt54237568',
        school: null,
        studentID: null
      },
      {
          name: 'baql wa',
          email: 'myCourses@gmail.com',
          psw: 'kgw124003952',
          pswRepeat: 'kgw124003952',
          school: null,
          studentID: null
      },{
        name: 'masx ba',
        email: 'password@hotmail.com',
        psw: 'cbfdre3457',
        pswRepeat: 'cbfdre3457',
        school: null,
        studentID: null
    },{
        name: 'baxl wa',
        email: 'ronald@yahoo.fr',
        psw: 'jtrqa21074',
        pswRepeat: 'jtrqa21074',
        school: null,
        studentID: null
    },{
        name: 'bazl wa',
        email: 'mySchedule@yahoo.com',
        psw: 'ydgrr5d658458',
        pswRepeat: 'ydgrr5d658458',
        school: null,
        studentID: null
    }];

    for(var i = 0; i < 5; i++){
        client
      .url(config.url)
      .waitForElementVisible('body', config.time.visible)
      .assert.visible(config.id.nonPartner)
      .click(config.id.nonPartner)
      .pause(config.time.pause)
      .assert.visible(config.id.name)
      .setValue(config.id.name, registrations[i].name)
      .pause(config.time.pause)
      .assert.visible(config.id.email)
      .setValue(config.id.email, registrations[i].email)
      .pause(config.time.pause)
      .assert.visible(config.id.psw)
      .setValue(config.id.psw, registrations[i].psw)
      .pause(config.time.pause)
      .assert.visible(config.id.pswRepeat)
      .setValue(config.id.pswRepeat, registrations[i].pswRepeat)
      .pause(config.time.pause)
      .click(config.id.signupbtn)
      .pause(config.time.pause)
      .assert.containsText(config.id.success, "Registering...")
    }
    client
      .end();
  },
  'Test invalid email or invalid password': function (client) {
    const registrations = [{
        name: 'fxa dd',
        email: 'okmine@hotmail.com',
        psw: 'qxt',
        pswRepeat: 'qxt',
        school: null,
        studentID: null,
        error: "The password must be between 4 to 14 characters"
      },{
        name: 'ffwqd wa',
        email: 'existing@hotmail.com',
        psw: 'kgw124003952',
        pswRepeat: 'kgw124003952',
        school: null,
        studentID: null,
        error: "The email already exists"
      },{
        name: 'asdq ba',
        email: 'password',
        psw: 'cbfdre3457',
        pswRepeat: 'cbfdre3457',
        school: null,
        studentID: null,
        error: "The email is incorrect"
      },{
        name: 'dfasd wa',
        email: 'existing2@hotmail.com',
        psw: 'jtrqa21074',
        pswRepeat: 'jtrqa21074',
        school: null,
        studentID: null,
        error: "The email already exists"
      },{
        name: 'jie wa',
        email: 'mySketching@yahoo.com',
        psw: 'ydgrr5d6584fewfwe',
        pswRepeat: 'ydgrr5d6584fewfwe',
        school: null,
        studentID: null,
        error: "The password must be between 4 to 14 characters"
      },{
        name: 'klas wa',
        email: 'こんにちは@hotmail.com',
        psw: 'fewf123123',
        pswRepeat: 'fewf123123',
        school: null,
        studentID: null,
        error: "The email must have alphanumeric characters"
      },{
        name: 'fewas bwaa',
        email: 'manger@hotmail.com',
        psw: 'الطعام',
        pswRepeat: 'الطعام',
        school: null,
        studentID: null,
        error: "The password must have alphanumeric characters"
      },{
        name: 'الطعام',
        email: 'mdjiqdwdwdd@yahoo.com',
        psw: 'ydgrr5d65',
        pswRepeat: 'ydgrr5d65',
        school: null,
        studentID: null,
        error: "The name must have alphanumeric characters"
      }];

      for(var i = 0; i < 8; i++){
        client
      .url(config.url)
      .waitForElementVisible('body', config.time.visible)
      .assert.visible(config.id.nonPartner)
      .click(config.id.nonPartner)
      .pause(config.time.pause)
      .assert.visible(config.id.name)
      .setValue(config.id.name, registrations[i].name)
      .pause(config.time.pause)
      .assert.visible(config.id.email)
      .setValue(config.id.email, registrations[i].email)
      .pause(config.time.pause)
      .assert.visible(config.id.psw)
      .setValue(config.id.psw, registrations[i].psw)
      .pause(config.time.pause)
      .assert.visible(config.id.pswRepeat)
      .setValue(config.id.pswRepeat, registrations[i].pswRepeat)
      .pause(config.time.pause)
      .click(config.id.signupbtn)
      .pause(config.time.pause)
      .assert.containsText(config.id.error, registrations[i].error)
    }
    client
      .end();
  }
};
