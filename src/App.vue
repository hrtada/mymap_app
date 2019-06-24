<template>
  <div id="app">
    <h1>MyMapアプリ</h1>
    <button id='logout'  @click="logout()">logout</button>
    <div id='content'>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    logout () {
      this.$router.push({ path: "/" });
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
  margin-top: 60px;
}

.h1{
  margin: 0 auto;
}


#logout{
  float: right;
  padding: 5px 10px;
  margin: 40px;
}
</style>
