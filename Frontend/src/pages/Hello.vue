<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li><a href="http://127.0.0.1:8087/#/Signup" target="_blank">Signup</a></li>
      <li><a href="http://127.0.0.1:8087/#/Login" target="_blank">Login</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to MySchedule!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
