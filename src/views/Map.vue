<template>
  <div>
    <UserInfo :screenName="screen"></UserInfo>
    <div id='settei'>
      <button @click="chancel()">範囲指定</button> 
      <button @click="chancel()">設定</button>
      <input type="text" :value="message" />
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
import UserInfo from './UserInfo'

let db = null;

export default {
  data () {
    return {
      screen: "map"
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
  components: { UserInfo },
  mounted() {
    let map;
    let marker = [];

    //地図を表示（下のforEach内にいれないこと）
    const initiallatLng = new google.maps.LatLng(35.708194, 139.808565);
    map = new google.maps.Map(document.getElementById('map'), {
      center: initiallatLng,
      zoom: 15
    });

    //マーカーを表示する関数を作成
    const makeMaker = (lat, lng, name)=>{
      const latLng = new google.maps.LatLng(lat, lng);
      marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: name,
        animation: google.maps.Animation.DROP
      });

      //マーカーをクリック時したら削除
      marker.addListener('click', () => {
        //クリックしたマーカーの座標を取得
        const dellatlng = marker.getPosition();
        console.log('削除対象の座標',dellatlng.lat(),dellatlng.lng());
        //firebaseのdataと照合し、座標が一致したデータのidを返す
        db.collection("user1").where("lat","==",dellatlng.lat()).where("lng","==",dellatlng.lng())
          .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const doc_id = doc.id;
              console.log('削除対象のID',doc_id);
              db.collection("user1").doc(doc_id).delete().then(() => {//該当データを削除
                console.log("削除成功");
              });
              marker.setMap(null);//マーカーを削除
            });          
          });            
      });
    }

    //コレクションitamotoの値を全取得しマーカーを表示
    db.collection("user1").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        //console.log('DBからの取得値%O', data);
        makeMaker(data['lat'], data['lng'], 'pointName');
      });
    });

    //マップをクリック時、マーカー表示&firebaseに座標を登録する
    //クリック時のイベント設定
    map.addListener('click', (e) => {
      //マーカーを表示する
      makeMaker(e.latLng.lat(),e.latLng.lng(), e.latLng.toString());

      console.log('クリック地点の座標',e.latLng.lat(),e.latLng.lng());
      db.collection("user1").add({//firebaseに座標を登録する
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      })
    });
  },
  computed:{
    message(){
      return this.$store.getters.message
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

