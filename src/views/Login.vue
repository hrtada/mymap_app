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
                    <input class="input" type="email" placeholder="Email">
                    <input class="input" type="password" placeholder="Password">
                  <p class="control">
                    <label class="checkbox">
                      <input type="checkbox">
                      Remember me
                    </label>
                  </p>
                  <p class="control">
                    <button id ='login' @click="login()" class="button is-primary is-medium is-fullwidth">
                      Login
                    </button>
                  </p>
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
import * as firebase from "firebase";
import 'bulma/css/bulma.css';//CSSフレームワーク
export default {
  data () {
    return {
    }
  },
  created() {
    
const firebaseConfig = {
  apiKey: "AIzaSyAGOB6BSOtrSwkcAr8uA4HeIlZk29AdYsU",
  authDomain: "mtfirebaseproject-64e86.firebaseapp.com",
  databaseURL: "https://mtfirebaseproject-64e86.firebaseio.com",
  projectId: "mtfirebaseproject-64e86",
  storageBucket: "mtfirebaseproject-64e86.appspot.com",
  messagingSenderId: "969784300164",
  appId: "1:969784300164:web:fddc0f90fc2a0916"
};
let firebaseApp = null;
console.log(firebase.apps.length);
if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
}
if (firebaseApp == null){
  return;
}

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
        console.log(result.user);
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
  methods: {
    login () {
      this.$router.push({ path: "/map" });
    }
  }
}
</script>

<style>

</style>
