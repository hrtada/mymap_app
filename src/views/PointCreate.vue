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
                  <option v-for="item in $store.state.label" :key="item.id" v-bind:value="item.id"> {{item.name}}
                  </option>
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
import  firebaseApp from '../firebase';
import 'bulma/css/bulma.css';//CSSフレームワーク

let db = firebaseApp.firestore()

export default {
  
  data () {
    return {
      label: null,
      date: null,
      memo: null,
    }
  },
  created() {
    
  },
  methods: {
    open(){
      this.$router.push({ path: "/picture" });     

    },
    chancel(){
      this.$router.push({ path: "/map" });  
    },
    entry(){
        db.collection("user1").add({//firebaseに登録する
          lat: this.$store.state.newLat,
          lng: this.$store.state.newLng,
          label: this.label,
          date: this.date,
          memo: this.memo
        }).then(()=> {
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
