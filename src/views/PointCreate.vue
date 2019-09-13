<template>
  <div>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <p class="title is-4">新しいポイントの作成</p>
        <div class="field">
          <label class="label">ラベル<span class="has-text-danger is-size-7"> 必須</span></label>
            <div class="control">
              <div class="select">
                <select required v-model="setLabel">
                  <option v-for="item in label" :key="item.id" v-bind:value="item.id"> {{item.name}}
                  </option>
                </select>
              </div>
            </div>
        </div>
        
        <div class="field">
          <label class="label">日付<span class="has-text-danger is-size-7"> 必須</span></label>
            <div class="control">
              <input class="input" type="date" required v-model="date">
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
              <input type="file" accept="image/*" @change="onFileChange($event)">
              <img :src="imageUrl" v-if="imageUrl">
            </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button @click="entry()" class="button is-link">登録</button>
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
import  MymapPoint from '../database/firestore/model/MymapPoint';
import 'bulma/css/bulma.css';//CSSフレームワーク

export default {
  
  data () {
    return {
      setLabel: '',
      date: '',
      memo: '',
      imageName:'',
      imageUrl:'',
      imageFile:''
    }
  },
  computed:{
    label(){return this.$store.getters.label.filter((e) => {
      return e.id != "0"
      })
    },
  },

  methods: {
    open(){
      this.$router.push({ path: "/picture" });     

    },

    chancel(){
      this.$router.push({ path: "/map" }); 

    },
    onFileChange(e){//ファイル選択の画面を開く
      const files = e.target.files;
        if(files.length > 0) {//ファイルが選択されたかチェック
          this.imageFile = files[0];
          this.imageName = files[0].name;
          const reader = new FileReader();//
          reader.onload = (e) => {//imageUrlに画像情報をセット
            this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(this.imageFile);//画像を読み込み
        }
    },

    async entry(){
      //必須項目の未入力チェックを付ける
      if(this.setLabel==''){
        alert('必須項目が未入力です');
      }
      else if(this.date==''){
        alert('必須項目が未入力です');
      }
      else{
        //画像のアップロード
        // if(this.imageUrl.length>0){
        //   // ストレージオブジェクト作成
        //   let storageRef = firebaseApp.storage().ref();
        //   // ファイルのパスを設定
        //   let mountainsRef = storageRef.child(`images/${this.imageName}`);
        //   // ファイルを適用してファイルアップロード開始
        //   mountainsRef.put(this.imageFile).then(snapshot => {
        //     snapshot.ref.getDownloadURL().then(downloadURL => {
        //       this.imageUrl = downloadURL
        //     });
        //   }); 
        // } 
        // else {//何もしない
        // }
        //ポイント情報をFirestoreに登録
        const mapPoint = new MymapPoint(this.$store.state.newLat, this.$store.state.newLng, this.setLabel, this.date, this.memo, this.imageUrl, this.imageName);
        // db.collection('mymap').doc(this.$store.state.userUid).collection('point').add({//firebaseに登録する
        //     lat: this.$store.state.newLat,
        //     lng: this.$store.state.newLng,
        //     label: this.setLabel,
        //     date: this.date,
        //     memo: this.memo,
        //     imageUrl: this.imageUrl,
        //     imageName: this.imageName,
        //   }).then(()=> {
        //   this.$router.push({ path: "/map" });//登録したら前画面に戻る
        //   }).catch(function (error) {
        //   console.error('Error adding document: ', error);
        //   });
        await mapPoint.create(this.$store.state.userUid);
        console.log("create end");
      }
    }

  }
}
</script>

<style>

</style>
