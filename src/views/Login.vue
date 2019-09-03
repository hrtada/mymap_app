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

let db = firebaseApp.firestore()

export default {
  data () {
    return {
      userUid:null,
      userName:null,
    }
  },

  created() {   
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
        const labelRef = db.collection('mymap').doc(userUid).collection('label');
        labelRef.doc('0').set({//初期ラベルとして登録する※ラベル登録時に配列が存在せずエラーになるため
          name:'初期ラベル'
          })
        let label =[];
        labelRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            label.push({id:doc.id, name:data.name});
            this.$store.commit('setlabel',{label: label});
            //console.log(this.$store.state.label);
        })
        //map画面に移動
        this.$router.push({ path: "/map" });
        }); 
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
