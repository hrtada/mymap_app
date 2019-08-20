<template>
  <div id="app">
  <header class="hero is-primary">
  <div class="hero-header">
    <div class="container">
      <div class="level">
        <h1 class="title">MyMapアプリ</h1>
    <div class=level-right>
    <p class="navbar-item">{{this.$store.state.userName}}</p>
    <button class="button is-outlined"  id='logout'  @click="logout()">logout</button>
    </div>
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
import  firebaseApp from 'firebase';

export default {
  name: 'app',
  methods: {
    logout () {
      firebaseApp.auth().signOut().then(() => {
        this.$router.push({ path: "/" });
    });
    },
  }
}
</script>

<style>

</style>
