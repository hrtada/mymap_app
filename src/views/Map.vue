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
/*globals google */
import * as firebase from "firebase/app";
import "firebase/firestore";

let db = null;

export default {
  data () {
    return {
      //Mypoints : [],
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
    let map;

    //地図を表示（下のforEach内にいれないこと）
    const initiallatLng = new google.maps.LatLng(35.708194, 139.808565);
    map = new google.maps.Map(document.getElementById('map'), {
      center: initiallatLng,
      zoom: 15
    });

    //マーカーを表示する関数を作成
    const makeMaker = (lat, lng)=>{
      const latLng = new google.maps.LatLng(lat, lng);
      new google.maps.Marker({ // マーカーの追加
        position: latLng, // マーカーを立てる位置
        map: map // マーカーを立てる地図
      });
    }

    //コレクションitamotoの値を全取得しマーカーを表示
    db.collection("user1").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('DBからの取得値%O', data);
        makeMaker(data['lat'], data['lng']);
      });
    });

    //マップをクリック時、マーカー表示&firebaseに座標を登録する
        map.addListener('click', (e) => {//クリック時のイベント設定
        new google.maps.Marker({//マーカーを表示する
          position: e.latLng,
          map: map,
          title: e.latLng.toString(),
          animation: google.maps.Animation.DROP
        });
        console.log('クリック地点の座標',e.latLng.lat(),e.latLng.lng());
        db.collection("user1").add({//firebaseに座標を登録する
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        })
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

