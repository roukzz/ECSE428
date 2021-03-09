<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">MySchedule</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <button @click="reminderClick()" id="reminderButton"> Reminders</button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
  </div>
  <div class="dropdown">
    <b-dropdown id="dropdown-1" text="Account & Settings" class="m-md-2">
      <b-dropdown-item-button @click="profileClick()" id="profileButton"><center>Profile</center></b-dropdown-item-button>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button @click="settingsClick()"><center>Settings & Privacy</center></b-dropdown-item-button>
      <b-dropdown-item-button @click="helpClick()"><center>Help & Support</center></b-dropdown-item-button>
      <b-dropdown-divider></b-dropdown-divider>
      <div class="signout">
        <b-button id="signout-button" variant="primary" size="sm"  @click="signOut()">Sign Out</b-button>
      </div>
    </b-dropdown>
  </div>
</nav>
</template>

<script>
export default {
    name: "Navbar",

  methods: {
    profileClick() {
      document.getElementById("profile").classList.toggle("active");
    },
    settingsClick() {
      document.getElementById("settingsPrivacy").classList.toggle("active");
    },
    helpClick() {
      document.getElementById("helpSupport").classList.toggle("active");
    },
    reminderClick() {
      document.getElementById("reminder").classList.toggle("active");
    },
    async signOut() {
      localStorage.clear();
      this.$router.push('/Login');
    }
  }
}

</script>

<style>

  .dropdown {
     float: right;
  }
  .signout {
    text-align: center;
  }

</style>