<template>
  <div>
    <UserInfo :screenName="screen"></UserInfo>
    <h2>LOGIN</h2>
    <button id ='login' @click="login()">login</button>
  </div>
</template>

<script>
import * as firebase from "firebase";
import UserInfo from './UserInfo'
export default {
  data () {
    return {
      screen: "login",
      provider: null
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
    // Initialize
    const firebaseApp = firebase.initializeApp(firebaseConfig);

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
  components: { UserInfo },
  methods: {
    login () {
      this.$router.push({ path: "/map" });
    }
  }
}
</script>

<style>
#login{
  padding: 5px 12px;
  margin: 40px;
}

</style>
