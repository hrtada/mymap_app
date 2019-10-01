<template>
<div id="app">
<body class="layout-default">
  <section class="hero is-fullheight is-medium is-primary">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <article class="card is-rounded">
                <div class="card-content">
                  <h1 class="is-size-4 has-text-weight-bold"> Login</h1>
                  <button @click="login()"><img src="../assets/btn_google_signin.png" alt="ログインする"></button>
                </div>
              </article>
            </div>
          </div>
    </div>
  </section>
</body> 
</div>
</template>

<script>
/*eslint-disable no-console */
import 'bulma/css/bulma.css';//CSSフレームワーク
import  firebaseApp from '../firebase';
import * as firebase from "firebase/app";
//import MymapLabelService from '../database/firestore/service/MymapLabelService'
import MymapLabelServiceMysql from '../database/firestore/service/MymapLabelserviceMysql'

//let db = firebaseApp.firestore()

export default {
  data () {
    return {
    }
  },

  methods: {

    login () {
    firebaseApp.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
      }
    });

    this.provider = new firebase.auth.GoogleAuthProvider();
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebaseApp 
      .auth()
      .signInWithPopup(this.provider)
      .then(result => {
        // const token = result.credential.accessToken
        //ログインユーザーのIDと名前を取得
        const user = result.user;
        const userUid = user.uid;
        const userName = user.displayName;
        this.$store.commit('setuserUid',{userUid:userUid});
        this.$store.commit('setuserName',{userName:userName});
        console.log(this.$store.state.userUid);
   
        //ラベル情報を取得し、storeに渡す
/*         const mymapLabelService = new MymapLabelService();
        const label = mymapLabelService.getLabel(userUid);
        this.$store.commit('setlabel',{label: label}); */

        //ユーザー情報を渡す
        //new MymapUserService.setUserId();
        const request = require('request');
          const option = {
              url: 'https://airy-quicksand.glitch.me/',
              method: 'POST',
              body: {
                'userId': userUid
              }
          }
          request.post(option, function(error, response, body){});      

        //ラベル情報を取得し、storeに渡す(MySQL)
        const mymapLabelService = new MymapLabelServiceMysql();
        const label = mymapLabelService.getLabel();
        this.$store.commit('setlabel',{label: label});
        console.log(label);

        //map画面に移動
        this.$router.push({ path: "/map" });

      })
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.email
        // const credential = error.credential
        console.log(errorCode + " : " + errorMessage);
      });
    }
  }
}
</script>

<style>

</style>
