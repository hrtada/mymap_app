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
                  <button @click="login()"><img
                      src="../assets/btn_google_signin.png"
                      alt="ログインする"
                    ></button>
                  <!-- <button @click="requestTest('testuser')">test</button> -->
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
import "bulma/css/bulma.css"; //CSSフレームワーク
import firebaseApp from "../firebase";
import * as firebase from "firebase/app";
//import MymapLabelService from '../database/firestore/service/MymapLabelService'
import MymapLabelServiceMysql from "../database/firestore/service/MymapLabelserviceMysql";
import MymapUserServiceMysql from "../database/firestore/service/MymapUserServiceMysql";

//let db = firebaseApp.firestore()

export default {
  data() {
    return {};
  },

  methods: {
    login() {
      firebaseApp.auth().onAuthStateChanged(authUser => {
        if (authUser) {
          console.log(authUser);
        }
      });

      this.provider = new firebase.auth.GoogleAuthProvider();
      this.provider.addScope(
        "https://www.googleapis.com/auth/contacts.readonly"
      );

      firebaseApp
        .auth()
        .signInWithPopup(this.provider)
        .then(result => {
          // const token = result.credential.accessToken
          //ログインユーザーのIDと名前を取得
          const user = result.user;
          const userUid = user.uid;
          const userName = user.displayName;
          this.$store.commit("setuserUid", { userUid: userUid });
          this.$store.commit("setuserName", { userName: userName });
          console.log(this.$store.state.userUid);

          //ユーザー情報を渡す
          const mymapUserServiceMysql = new MymapUserServiceMysql();
          mymapUserServiceMysql.sendtoUser(userUid);
          //this.requestTest(userUid);

          //ラベル情報を取得し、storeに渡す(MySQL)
          this.getLabellist();

          //map画面に移動
          this.$router.push({ path: "/" });
        })
        .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          // const email = error.email
          // const credential = error.credential
          console.log(errorCode + " : " + errorMessage);
        });
    },

    //ラベル情報を取得し、storeに渡す(MySQL)
      async getLabellist(){
        const mymapLabelServiceMysql = new MymapLabelServiceMysql();
        const label = await mymapLabelServiceMysql.getLabel();
        this.$store.commit("setlabel", { label: label });
        console.log(label);
      }
    //ユーザー情報をServerに送る
/*       requestTest(userUid) {
      const request = require("request");
      const options = {
        url: "http://192.168.56.1:8000/",
        method: "POST",
        timeout: 5000,
        form: { userUid: userUid }
      };
      request(options, (error, response, body) => {
        console.log(error);
        console.log(response);
        console.log(body);
      });
    }, */

  }
}
</script>

<style>
</style>
