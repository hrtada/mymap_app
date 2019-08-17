import * as firebase from "firebase/app";
import "firebase/firestore"; 
import "firebase/auth"; 


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
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
    }

export default firebaseApp

//export default firebase.firestore()
