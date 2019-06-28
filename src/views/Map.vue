<template>
  <div>
    <div id='settei'>
      <button @click="chancel()">範囲指定</button> 
      <button @click="chancel()">設定</button>
    </div>
<!--     <input v-model="Mypoint" /> -->
    <div id ='map'></div>
    <br>
    <a @click="create()">ﾎﾟｲﾝﾄ作成画面に遷移（仮）</a>
    <br>
    <a @click="edit()">ﾎﾟｲﾝﾄ編集に遷移（仮）</a>
    <br>
  </div>
</template>

<script>
/* eslint-disable no-console */

import * as firebase from "firebase/app";
import "firebase/firestore";
let db = null;

export default {
  data () {
    return {
      MylatLng : null,
      Mypoint : null,
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
      db = firebaseApp.firestore();
      
      //コレクションitamotoの値を全取得してMypointにセットする
      db.collection("itamoto").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
          const data = doc.data();
          this.Mypoint = data;
          console.log('DBからの取得値%O', this.Mypoint);
         });
      });
   },
  mounted() {
    let markerLatLng;
    let marker;
    let map;

     //地図表示のための緯度経度を取得
    this.MylatLng = new google.maps.LatLng({lat:this.Mypoint[0]['lat'],lng:this.Mypoint[0]['lng']});
    console.log('地図表示　%O', this.MylatLng);
    //地図を表示
    new google.maps.Map(document.getElementById('map'), {
      center: this.MylatLng,
      zoom: 15
      });

    // マーカーを表示する
    for (let i = 0; i < this.MylatLng.length; i++) {
      markerLatLng = new google.maps.LatLng({lat: this.MylatLng[i]['lat'], lng: this.MylatLng[i]['lng']}); // 緯度経度のデータ作成
      marker[i] = new google.maps.Marker({ // マーカーの追加
        position: markerLatLng, // マーカーを立てる位置を指定
        map: map // マーカーを立てる地図を指定
       });
      }
  },

  methods: {
    create(){
      this.$router.push({ path: "/pointcreate" });     
    },
    edit(){
      this.$router.push({ path: "/pointedit"});
    }
  }
}
</script>

<style>
 #settei{float: right;}
 #map{ height: 500px;}

</style>

