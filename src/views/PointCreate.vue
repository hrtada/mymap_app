<template>
  <div>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <p class="title is-4">新しいポイントの作成</p>
        <div class="field">
          <label class="label">ラベル</label>
            <div class="control">
              <div class="select">
                <select v-model="label">
                  <option>パン屋</option><!--暫定の表示ラベル情報は共通で使えるようにする-->
                  <option>駐輪場</option>
                </select>
              </div>
            </div>
        </div>
        
        <div class="field">
          <label class="label">日付</label>
            <div class="control">
              <input class="input" type="date" v-model="date">
            </div>
        </div>

        <div class="field">
          <label class="label">メモ</label>
            <div class="control">
              <textarea class="textarea" placeholder="メモ" v-model="memo"></textarea>
            </div>
        </div>

        <div class="field">
          <label class="label">写真</label>
            <div class="control">
              <button @click="open()" class="button is-rounded">フォルダ選択</button>
            </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button @click="entry()" class="button is-link" input type="reset">登録</button>
          </div>
          <div class="control">
            <button @click="chancel()" class="button is-link">ｷｬﾝｾﾙ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import * as firebase from "firebase/app";
import "firebase/firestore";
import 'bulma/css/bulma.css';//CSSフレームワーク

let db = null;

export default {
  data () {
    return {
      label: null,
      date: null,
      memo: null,
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
  methods: {
    open(){
      this.$router.push({ path: "/picture" });     
    },
    chancel(){
      this.$router.push({ path: "/map" });  
    },
    entry(){
        db.collection("user1").add({//firebaseに座標を登録する
          //lat: e.latLng.lat(),//緯度経度はvuex関連で後回し
          //lng: e.latLng.lng(),
          label: this.label,
          date: this.date,
          memo: this.memo
        }).then((docRef)=> {
        console.log('Document written with ID: ', docRef.id);
        this.$router.push({ path: "/map" });//登録したら前画面に戻る
        }).catch(function (error) {
        console.error('Error adding document: ', error);
        });
    }
  }
}
</script>

<style>

</style>
