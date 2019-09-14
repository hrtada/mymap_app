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
            <button @click="del()" class="button is-link">削除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import  MymapPoint from '../database/firestore/model/MymapPoint';
import firebaseApp from '../firebase';//最終的に不要
import 'bulma/css/bulma.css';//CSSフレームワーク

let db = firebaseApp.firestore();
let docId;

export default {

  data () {
    return {
      setLabel: '',
      date: '',
      memo: '',
      lat: '',
      lng: '',
      imageName:'',
      imageUrl:'',
      imageFile:'',
      imageName_old:'',
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
        //console.log(docId);
        this.setLabel = pos['label'];
        this.memo = pos['memo'];
        this.date = pos['date'];
        this.lat = pos['lat'];
        this.lng = pos['lng'];
        this.imageUrl = pos['imageUrl']//追加2019/09/03
        this.imageUrl_old = pos['imageUrl']//追加2019/09/09
        this.imageName = pos['imageName'] //追加2019/09/03
        this.imageName_old = pos['imageName'] //元画像ファイル名を退避
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
        }
    },
  
    entry(){
      //必須項目の未入力チェックを付ける
      if(this.setLabel==''){
        alert('必須項目が未入力です');
      }
      else if(this.date==''){
        alert('必須項目が未入力です');
      }
      else{
      //画像アップロード
      if(this.imageUrl.length>0 && this.imageUrl != this.imageUrl_old){
        // ストレージオブジェクト作成
        let storageRef = firebaseApp.storage().ref();
        // ファイルのパスを設定
        let mountainsRef = storageRef.child(`${this.$store.state.userUid}/${this.imageName}`);
        // ファイルを適用してファイルアップロード開始
        mountainsRef.put(this.imageFile).then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            this.imageUrl = downloadURL;

          //元画像ファイルを削除
          let delRef = storageRef.child(`${this.$store.state.userUid}/${this.imageName_old}`);
          delRef.delete();
          });
        });  
      }
      else{//何もしない
      }
      //ポイント情報をFirestoreに登録
      const mapPoint = new MymapPoint(this.$store.state.newLat, this.$store.state.newLng, this.setLabel, this.date, this.memo, this.imageUrl, this.imageName);
/*         db.collection('mymap').doc(this.$store.state.userUid).collection('point').doc(docId).set({//更新する
            lat: this.lat,
            lng: this.lng,
            label: this.setLabel,
            date: this.date,
            memo: this.memo,
            imageUrl:this.imageUrl,
            imageName: this.imageName,
        }).then(() => {
          this.$router.push({ path: "/mapshow" });
          }).catch(function (error) {
          console.error('Error adding document: ', error);
          }); 
          this.$router.push({ path: "/map" });//前画面に戻る*/
      mapPoint.create(this.$store.state.userUid.docId);
        
      }
    },

    del(){
      //db.collection('mymap').doc(this.$store.state.userUid).collection('point').doc(docId).delete().then(() => {//pointデータを削除
        const mapPoint = new MymapPoint(this.$store.state.newLat, this.$store.state.newLng, this.setLabel, this.date, this.memo, this.imageUrl, this.imageName);
        mapPoint.del(this.$store.state.userUid,docId)
        //strageの画像ファイルを削除
/*         let storageRef = firebaseApp.storage().ref();
        let delRef = storageRef.child(`${this.$store.state.userUid}/${this.imageName}`);
        delRef.delete().then(() => {
        this.$router.push({ path: "/mapshow" });//全画面に戻る 
        })*/
      //})
    }
  },
}
</script>
