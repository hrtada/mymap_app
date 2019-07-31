<template>
  <div>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <p class="title is-4">ポイント詳細</p>
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
    }
  },
  created() {
  },

  mounted() {

    //★2019/07/25Mapから移動
      //マーカーをクリック時したら削除
      // marker.addListener('click', () => {
      //   //クリックしたマーカーの座標を取得
      //   const dellatlng = marker.getPosition();
      //   console.log('削除対象の座標',dellatlng.lat(),dellatlng.lng());
      //   //firebaseのdataと照合し、座標が一致したデータのidを返す
      //   db.collection("user1").where("lat","==",dellatlng.lat()).where("lng","==",dellatlng.lng())
      //     .get().then((querySnapshot) => {
      //       querySnapshot.forEach((doc) => {
      //         const doc_id = doc.id;
      //         console.log('削除対象のID',doc_id);
      //         db.collection("user1").doc(doc_id).delete().then(() => {//該当データを削除
      //           console.log("削除成功");
      //         });
      //         marker.setMap(null);//マーカーを削除
      //       });          
      //     });            
      // }); 
    }    
  },
  methods: {
    open(){
      this.$router.push({ path: "/picture" });     
    },
    chancel(){
      this.$router.push({ path: "/map" });  
    }
  }
}
</script>
