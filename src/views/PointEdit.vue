<template>
  <div>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <p class="title is-4">ポイント詳細</p>
        <div class="field">
          <label class="label">ラベル</label>
            <div class="control">
              <div class="select">
                <select v-model="setLabel">
                  <option v-for="item in label" :key="item.id" v-bind:value="item.id"> {{item.name}}
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
          <div class="control">
            <button @click="del()" class="button is-link">削除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import firebaseApp from '../firebase';
import 'bulma/css/bulma.css';//CSSフレームワーク

let db = firebaseApp.firestore();
let docId;

export default {

  data () {
    return {
      setLabel: null,
      //label: null,
      date: null,
      memo: null,
      lat: null,
      lng: null,
    }
  },
  computed:{
    label(){return this.$store.getters.label.filter((e) => {
      return e.id != "0"
      })
    },
  },

  mounted() {
   //クリックしたマーカーの位置情報からデータを抽出する
    const posRef = db.collection('mymap').doc(this.$store.state.userUid).collection('point').where("lat","==",this.$store.state.editLat).where("lng","==",this.$store.state.editLng);//座標が一致するデータのクエリ
    posRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const pos = doc.data();
        docId = doc.id;
        console.log(docId);
        this.setLabel = pos['label'];
        this.memo = pos['memo'];
        this.date = pos['date'];
        this.lat = pos['lat'];
        this.lng = pos['lng'];
      })      
    });
  },

  methods: {
    open(){
      this.$router.push({ path: "/picture" });     
    },
    chancel(){
      this.$router.push({ path: "/mapshow" });  
    },
    entry(){
      db.collection('mymap').doc(this.$store.state.userUid).collection('point').doc(docId).set({//更新する
          lat: this.lat,
          lng: this.lng,
          label: this.setLabel,
          date: this.date,
          memo: this.memo
      }).then(() => {
      this.$router.push({ path: "/mapshow" });
      })
    },
    del(){
      db.collection('user1').doc(docId).delete().then(() => {//該当データを削除
      this.$router.push({ path: "/mapshow" });
      })
    }
  },
}
</script>
