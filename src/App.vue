<template>
  <div id="app">
    <div id="nav" class="hidden">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <h1 class="text-right">{{today}}</h1>
    <router-view/>
  </div>
</template>

<script>
import format from 'date-fns/format';

export default {
  data() {
    return {
      today: format(new Date(), 'DD.MM.YY'),
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media (min-width: 900px) {
  #app {
    margin: 0 150px;
  }
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.hidden {
  display: none;
}
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}
</style>
