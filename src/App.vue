<template>
  <div id="app">
    <header class="hero is-primary">
      <div class="hero-header">
        <div class="container">
          <div class="level">
            <h1 class="title">MyMapアプリ</h1>
            <div class=level-right>
              <p class="navbar-item">{{this.$store.state.userName}}</p>
              <button
                class="button is-outlined"
                id='logout'
                @click="logout()"
              >logout</button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div id='content'>
      <router-view />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import "bulma/css/bulma.css"; //CSSフレームワーク
import firebaseApp from "firebase";

export default {
  name: "app",
  created() {
    console.log("app created");
  },
  mounted() {
    console.log("app mounted");
    console.log(this.$store.state.userUid);
  },
  methods: {
    logout() {
      firebaseApp
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ path: "/login" });
        });
      this.$store.commit("setuserUid", { userUid: "" });
      this.$store.commit("setuserName", { userName: "" });
    }
  },
  watch: {
    $route: function(to, from) {
      if (to.path !== from.path) {
        console.log("login check");
        console.log(this.$store.state.userUid);
        if(!this.$store.state.userUid){
          this.$router.push({ path: "/login" });
        }
      }
    }
  }
};
</script>

<style>
</style>
