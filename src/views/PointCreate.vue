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
import  MymapPointService from '../database/firestore/service/MymapPointService';
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
      const date = new Date();
      const ISO = date.toISOString();//ファイル名を日付にするために取得
      const files = e.target.files;   
        if(files.length > 0) {//ファイルが選択されたかチェック
          this.imageFile = files[0];
          this.imageName = ISO;
          const reader = new FileReader();//
          reader.onload = (e) => {//imageUrlに画像情報をセット 
            this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(this.imageFile);//画像を読み込み
        }else{          
          this.imageName = '';
          this.imageUrl = '';
          this.imageFile = '';
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

        // //画像のアップロード
        // if(this.imageUrl.length>0){
        //   // ストレージオブジェクト作成
        //   let storageRef = firebaseApp.storage().ref();
        //   // ファイルのパスを設定
        //   let mountainsRef = storageRef.child(`${this.$store.state.userUid}/${this.imageName}`);
        //   // ファイルを適用してファイルアップロード開始
        //   mountainsRef.put(this.imageFile).then(snapshot => {
        //     snapshot.ref.getDownloadURL().then(downloadURL => {
        //       this.imageUrl = downloadURL
        //     });
        //   }); 
        // } 
        // else {//何もしない
        // }

        const mymapPointService = new MymapPointService();
        //画像をアップロード
        if(this.imageUrl.length>0){
          const getImageUrl = await mymapPointService.uploadImage(this.$store.state.userUid,this.imageName,this.imageFile)
          this.imageUrl = getImageUrl
        }      

        //ポイント情報をFirestoreに登録
        const mapPoint = new MymapPoint(0,this.$store.state.newLat, this.$store.state.newLng, this.setLabel, this.date, this.memo, this.imageUrl, this.imageName);
        const createMapPoint = await mymapPointService.create(this.$store.state.userUid, mapPoint);

        if(createMapPoint == 'true'){
          this.$router.push({ path: "/map" });//前画面に戻る 
        }else{
          alert('登録できませんでした');
        }

        }
      
      }
    }

  }

</script>

<style>

</style>
