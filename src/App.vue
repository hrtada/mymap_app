<template>
  <div id="app">
  <header class="hero is-primary">
  <div class="hero-header">
    <div class="container">
    <h1 class="title">MyMapアプリ</h1>
    <div class=level-right>
    <button class="button is-outlined"  id='logout'  @click="logout()">logout</button>
    </div>
    </div>
    </div>
  </header>
    <div id='content'>
      <router-view/>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import 'bulma/css/bulma.css';//CSSフレームワーク
export default {
  name: 'app',
  methods: {
    logout () {
      this.$router.push({ path: "/" });
    }
  },
}
</script>

<style>

</style>
