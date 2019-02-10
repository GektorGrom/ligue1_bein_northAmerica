<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {

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

@media (prefers-color-scheme: dark) {
  #app {
    color: #c7c7c7;
  }
}

@media (min-width: 900px) {
  #app {
    max-width: 980px;
    margin: 0 auto;
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
.text-center {
  text-align: center;
}
.block-center {
  margin: 0 auto;
}
</style>
