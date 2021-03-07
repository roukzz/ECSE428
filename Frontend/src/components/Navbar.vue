<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">MySchedule</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <button @click="reminderClick()" id="reminderButton"> Reminders</button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <!-- <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
    </ul> -->
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
      <!-- <b-dropdown-item active>Active action</b-dropdown-item>
      <b-dropdown-item disabled>Disabled action</b-dropdown-item> -->
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