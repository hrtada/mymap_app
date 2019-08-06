<template>
<div>
  <div class="hero is-primary">
    <div class="hero-header">
      <div class="container">
        <div class="field is-grouped">
          <div class="control">
            <label for="trigger1">条件指定</label>
          </div>
          <div class="control">
            <label for="trigger2">設定</label>
          </div>
          <div class="control">
            <label @click="mapNew()">新規登録画面へ戻る</label>
          </div>
        </div> 

      </div>
    </div> 
  </div>

  <div id ='map'></div>

  <!--modal1-->
    <div class="modal_wrap">
      <input type="checkbox" id="trigger1">
        <div class="modal_overlay">
        <div class="modal_content">
            <label for="trigger1" class="close_button">✖️</label>
            <h1 class="has-text-weight-bold">条件指定</h1>
            <p>＜ラベルの選択＞</p>
            <ul>
              <li v-for="item in $store.state.tag" :key="item.index" > {{item}}</li>            
            </ul>
            <button @click="filter()">表示</button>
        </div>
        </div>
    </div>
    <!--modal2-->
    <div class="modal_wrap">
      <input type="checkbox" id="trigger2">
        <div class="modal_overlay">
        <div class="modal_content">
            <label for="trigger2" class="close_button">✖️</label>
            <h1 class="has-text-weight-bold">設定</h1>
            <p>ラベルの管理…</p>
        </div>
        </div>
    </div>

    <!--情報ウィンドウ※-->
    <div id="iw_wrapper">
      <div id="infowindw">
        <button @click="edit()">詳細表示</button>
      </div>
    </div>
</div>
</template>

<script>
/* eslint-disable no-console */
/*globals google */
import db from '../firestore';
import 'bulma/css/bulma.css';//CSSフレームワーク

//let db = null;

export default {
   data () {
     return{}
  },

  created() {
  },

  mounted() {
    let map;

     //ラベル情報を取得
    db.collection("user1").doc("label").get().then((doc)=>{
          this.$store.state.tag = doc.data();
      });

    //地図を表示（下のforEach内にいれないこと）
    const initiallatLng = new google.maps.LatLng(35.708194, 139.808565);
    map = new google.maps.Map(document.getElementById('map'), {
      center: initiallatLng,
      zoom: 14,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false
    });

    //マーカーを表示する関数を作成
    const makeMaker = (lat, lng)=>{
      const latLng = new google.maps.LatLng(lat, lng);
      const marker = new google.maps.Marker({
        position: latLng,
        map: map,
        animation: google.maps.Animation.DROP
      });

      // マーカークリックで情報ウィンドウを表示
      let info = new google.maps.InfoWindow({
        content:document.getElementById('infowindw')
      }); 

        marker.addListener('click', ()=> {
        info.open(map, marker);
        this.$store.state.editPos = marker.getPosition();//緯度経度情報を渡す
        console.log(this.$store.state.editPos);
      });  
    }
    //★条件指定（filter）によって表示内容を変更できるようにする
    //コレクションuser１の値を全取得しマーカーを表示
     db.collection("user1").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        //console.log('DBからの取得値%O', data);
        makeMaker(data['lat'], data['lng'], 'pointName');
      });
    }); 
  
  },

  methods: {
    mapNew(){
      this.$router.push({ path: "/map" });     
    },
    edit(){
      this.$router.push({ path: "/pointedit"});
    },
    filter(){//条件指定での表示に変更予定
    
    }
  }
}
</script>

<style>
 /* #settei{float: right;} */
 #map{ height: 500px;}

/*モーダル*/
.modal_wrap input{
    display: none;
}

.modal_overlay{
    display: flex;
    justify-content: center;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    opacity: 0;
    transition: opacity 0.5s, transform 0s 0.5s;
    transform: scale(0);
} 

.modal_content{
    position: relative;
    align-self: center;
    width: 40%;
    max-width: 600px;
    padding: 30px 30px 15px;
    box-sizing: border-box;
    background: #fff;
    line-height: 1.4em;
    transition: 0.5s;
}

.close_button{
    position: absolute;
    top: 14px;
    right: 16px;
    font-size: 20px;
    cursor: pointer;
}

.modal_wrap input:checked ~ .modal_overlay{
    opacity: 1;/*透明度*/
    transform: scale(1);
    transition: opacity 0.5s;
}

#iw_wrapper {
  display: none;
}

</style>

