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
              <input type="file" accept="image/*" @change="onFileChange($event)">
              <img :src="imageUrl" v-if="imageUrl">
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
            <button @click="dell()" class="button is-link">削除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import  MymapPoint from '../database/firestore/model/MymapPoint';
import MymapPointService from '../database/firestore/service/MymapPointService'
import MymapPointServiceMysql from '../database/firestore/service/MymapPointServiceMysql'
import 'bulma/css/bulma.css';//CSSフレームワーク

export default {

  data () {
    return {
      setLabel:'',
      date: '',
      memo: '',
      lat: '',
      lng: '',
      imageName:'',
      imageUrl:'',
      imageFile:'',
      imageName_old:'',
      id:'',
    }
  },
  computed:{
    label(){return this.$store.getters.label.filter((e) => {
      return e.id != "0"
      })
    },
  },

  mounted() {
        //ポイント情報を取得

/*         const getMapPointDetail = async()=>{
          const mymapPointService = new MymapPointService();
          const lists = await mymapPointService.showPointDetail(this.$store.state.userUid,this.$store.state.editLat,this.$store.state.editLng ); */
          const getMapPointDetail = async() =>{
            const mymapPointServiceMysql = new MymapPointServiceMysql();
            await mymapPointServiceMysql.sendtoLatlng(this.$store.state.userUid,this.$store.state.editLat,this.$store.state.editLng);
            const lists = await mymapPointServiceMysql.showPointDetail();
            console.log('リスト',lists);

        
          //画面上の各項目に表示
          this.setLabel = lists[0].label;
          this.memo = lists[0].memo;
          this.date =lists[0].date;
          this.lat = lists[0].lat;
          this.lng = lists[0].lng;
          this.imageUrl = lists[0].imageUrl
          this.imageUrl_old =lists[0].imageUrl
          this.imageName = lists[0].imageName
          this.imageName_old = lists[0].imageName
          this.id = lists[0].id
          }
        getMapPointDetail(); 
  },

  methods: {
    open(){
      this.$router.push({ path: "/picture" });     
    },
    chancel(){
      this.$router.push({ path: "/mapshow" });  
    },

    onFileChange(e){
      const files = e.target.files;
      const date = new Date();
      const ISO = date.toISOString();//ファイル名を日付にする
        if(files.length > 0) {//ファイルが選択されたかチェック
          this.imageFile = files[0];
          this.imageName = ISO;
          const reader = new FileReader();//
          reader.onload = (e) => {//imageDataに画像情報をセット
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

         const mymapPointService = new MymapPointService();
        
        //画像をアップロード＆変更前画像の削除
        if(this.imageUrl.length>0 && this.imageUrl != this.imageUrl_old){
          const getImageUrl = await mymapPointService.uploadImage(this.$store.state.userUid,this.imageName,this.imageFile)
          this.imageUrl = getImageUrl
          mymapPointService.deleteImage(this.$store.state.userUid,this.imageName_old)
        }

        //ポイント情報をSQLiteに登録
        const mymapPointServiceMysql = new MymapPointServiceMysql();
        const mapPoint = new MymapPoint(this.id, this.lat, this.lng, this.setLabel, this.date, this.memo, this.imageUrl, this.imageName);
        mymapPointServiceMysql.update(this.$store.state.userUid, mapPoint);
        this.$router.push({ path: "/mapshow" });//前画面に戻る 

        // const mapPoint = new MymapPoint(this.id, this.lat,this.lng, this.setLabel, this.date, this.memo, this.imageUrl, this.imageName);
        // const editMapPoint = await mymapPointService.edit(this.$store.state.userUid, mapPoint);

        // if(editMapPoint == 'true'){
        //   this.$router.push({ path: "/mapshow" });//前画面に戻る 
        // }else{
        //   alert('登録できませんでした');
        // }
      }

    },

    async dell(){
      const mymapPointServiceMysql = new MymapPointServiceMysql();
      await mymapPointServiceMysql.delete(this.id);
      this.$router.push({ path: "/mapshow" });//前画面に戻る 

      //const mymapPointService = new MymapPointService();
      //mymapPointService.deleteImage(this.$store.state.userUid,this.imageName);//★画像の削除。エラーが起こるので一時的にコメントアウト。

/*       //const mymapPointService = new MymapPointService();
      const mymapPointService = new MymapPointService();
      const dellMapPoint = await mymapPointService.dell(this.$store.state.userUid, this.id);
      mymapPointService.deleteImage(this.$store.state.userUid,this.imageName);//画像の削除
      
      if(dellMapPoint == 'true'){
          this.$router.push({ path: "/mapshow" });//前画面に戻る 
      }else{
          alert('削除できませんでした');
      } */

    }
  },
}
</script>
