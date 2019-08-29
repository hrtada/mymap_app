<template>
  <div>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <p class="title is-4">新しいポイントの作成</p>
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
              <input type="file" id="files" accept="image/*" @change="onFileChange($event)">
              <img :src="imageData" v-if="imageData">
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
      setLabel: null,
      date: null,
      memo: null,
      imageData: '',
    }
  },
  computed:{
    label(){return this.$store.getters.label.filter((e) => {
      return e.id != "0"
      })
    },
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
        db.collection('mymap').doc(this.$store.state.userUid).collection('point').add({//firebaseに登録する
          lat: this.$store.state.newLat,
          lng: this.$store.state.newLng,
          label: this.setLabel,
          date: this.date,
          memo: this.memo,
          imagePath: this.imageData,
        }).then(()=> {
        this.$router.push({ path: "/map" });//登録したら前画面に戻る
        }).catch(function (error) {
        console.error('Error adding document: ', error);
        });
    },

    onFileChange(e){
      const files = e.target.files;
      if(files.length > 0) {//ファイルが選択されたかチェック
        const file = files[0];
        const reader = new FileReader();//
        reader.onload = (e) => {//imageDataに画像情報をセット
          this.imageData = e.target.result;
                  console.log(this.imageData);
        };
        reader.readAsDataURL(file);//画像を読み込み

    }
},

  }
}
</script>

<style>

</style>
