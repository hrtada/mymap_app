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
import gmap from '@google/maps';
const googleMapsClient = gmap.createClient({
  key: 'AIzaSyDZtGF2N7VY8u4TVx504yOmLu860NTkot8'
});

export default {
  data () {
    return {
      Mypoints : [],
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
   },
  mounted() {
    let markerLatLng;
    let marker;
    let map;

    // node.js のgoogleMap API呼び出しサンプル
    googleMapsClient.geocode({
      address: '1600 Amphitheatre Parkway, Mountain View, CA'
    }, function(err, response) {
      if (!err) {
        console.log(response.json.results);
      }
    });

    //地図を表示
    const MylatLng = new google.maps.LatLng(35.708194, 139.808565);
    map = new google.maps.Map(document.getElementById('map'), {
      center: MylatLng,
      zoom: 15
    });

    const displayGmap = (lat, lng)=>{
      const latLng = new google.maps.LatLng(lat, lng);
      new google.maps.Marker({ // マーカーの追加
        position: latLng, // マーカーを立てる位置を指定
        map: map // マーカーを立てる地図を指定
      });
    }

    //コレクションitamotoの値を全取得してMypointにセットする
    db.collection("itamoto").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.Mypoints.push(data);
        console.log('DBからの取得値%O', this.Mypoints);
        displayGmap(data['lat'], data['lng']);
        // //地図表示のための緯度経度を取得
        // const MylatLng = new google.maps.LatLng(this.Mypoint['lat'], this.Mypoint['lng']);
        // // this.MylatLng = new google.maps.LatLng(44, 11);
        // console.log('地図表示　%O', MylatLng);


        // // マーカーを表示する
        // new google.maps.Marker({ // マーカーの追加
        //   position: MylatLng, // マーカーを立てる位置を指定
        //   map: map // マーカーを立てる地図を指定
        // });
      });
    });



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

