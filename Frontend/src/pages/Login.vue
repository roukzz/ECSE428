<template>
  <!-- Frame div -->
  <div>
    <!-- Intro -->
    <div>
      <!-- Name -->
      <img src="../assets/logo.jpg" width="500px" height="auto" alt="mySchedule" onclick="window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')">

      <!-- Description -->
      <div id="login_intro_text">
        Welcome to mySchedule, your intelligent schedule organizer!<br/>
        <span>
          Use mySchedule to plan your weekly schedule, set up study sesssions <br/>
          with friends, get personalized schedule recommendations and much more!
        </span>
      </div>
      <button onClick="window.open('http://127.0.0.1:8087/#/CreateTask')">Create</button>
    </div>

    <!-- Form -->
    <div id="login_form">

      <div style="width:100%; text-align:center; margin-top: 20px; font-weight: bold; font-size:20px">
        Log in to mySchedule
      </div>

      <!-- Fields -->
      <div id="login_fields">
        <input type="text" id="field_uname" placeholder="username">
        <input type="text" id="field_password" placeholder="password">
        <div id="password_recovery">Forgot password?</div>
        <button type="button">Log in</button>
        <div id="create_account" v-on:click="toRegistration();">Not registered? Create account</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {
  },
  methods: {
    toRegistration() {
      this.$router.push('Signup');
    }
  }
};
</script>

<style scoped>

#login_intro_text {
  text-align: center;
  width: 100%;
  height: auto;
  font: arial;
  font-size: 26px;
  font-weight: bold;
}

#login_intro_text span {
  font-size: 18px;
  font-weight: normal;
}

#login_form {
  margin: 0 auto;
  margin-top: 30px;
  width: 500px;
  height: 300px;
  border: 2px solid grey;
}

#login_fields {
  margin: 0 auto;
  margin-top: 10px;
  width: 220px;
  height: fit-content;
}

#login_fields input, #login_fields button {
  margin: 10px;
  width: calc(100% - 20px);
}

#login_fields div {
  width: calc(100% - 20px);
  text-align: center;
  color: #42bff5;
  font-size: 14px;
}

#password_recovery {
  margin-top: -5px;
}

#create_account {
  margin-top: 20px;
}

#password_recovery:hover, #create_account:hover {
  cursor: pointer;
  text-decoration: underline;
}

img {
  margin: 20px;
}

img:hover {
  cursor: pointer;
}

</style>