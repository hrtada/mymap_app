<template>
<div>
  <div class="hero is-primary">
    <div class="hero-header">
      <div class="field is-grouped">
        <div class="control">
        <label @click="mapNew()">前画面へ戻る</label>
        </div>
      </div>    
    </div> 
  </div>     

  <div id ='map'></div>

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
import 'bulma/css/bulma.css';//CSSフレームワーク
import  MymapPoint from '../database/firestore/model/MymapPoint';//★0912追加
import  firebaseApp from '../firebase';//★0912使わなくなる予定

let db = firebaseApp.firestore()//★0912使わなくなる予定

export default {
   data () {
     return{
     }
  },

  computed:{
    editLat(){return this.$store.getters.editLat},//storeと同期する
    editLng(){return this.$store.getters.editLng}
  },
  created() {
  },
  
  mounted() {
    let map;

    //地図を表示（下のforEach内にいれないこと）
    const bounds = new google.maps.LatLngBounds();
    const initiallatLng = new google.maps.LatLng(35.708194, 139.808565);
    map = new google.maps.Map(document.getElementById('map'), {
      center: initiallatLng,
      zoom: 15,
      maxZoom: 15,
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
      //マーカーの表示領域を調整のための位置座標を取得
      bounds.extend (marker.position);

      // マーカークリックで情報ウィンドウを表示
      let info = new google.maps.InfoWindow({
        content:document.getElementById('infowindw')
      }); 

        marker.addListener('click', ()=> {
        info.open(map, marker);
        const mLat = marker.getPosition().lat();//緯度情報を渡す
        const mLng = marker.getPosition().lng();
        this.$store.commit('seteditLat', {editLat: mLat});//store.stateに渡す
        this.$store.commit('seteditLng', {editLng: mLng});
      });  

    }
    //条件指定で選択したラベル情報から取得しマーカー表示
      const posRef = db.collection('mymap').doc(this.$store.state.userUid).collection('point').where("label","==",this.$store.state.checked);    
      //const mapPoint = new MymapPoint();★0912上手くいかなかった。仕掛中
      //mapPoint.reference(this.$store.state.userUid,this.$store.state.checked);
      //mapPoint.reference.get().then(qs => {
      posRef.get().then(qs => {
        qs.forEach(doc => {
          let posData = doc.data();
            makeMaker(posData['lat'], posData['lng']);     
        });
        if(bounds.ja.g==180,bounds.ja.h==-180){
          alert('表示するデータがありません');
          this.$router.push({ path: "/map" }); 
        }else{
        map.fitBounds (bounds);//全マーカーが表示されるように調整
        }
      });
        
        
    },

  

  methods: {
    mapNew(){
      this.$router.push({ path: "/map" });     
    },
    edit(){
      this.$router.push({ path: "/pointedit"});
    },
   
  }
}
</script>

<style>
  #map{ height: 500px;}

  #iw_wrapper{/*情報ウィンドウからボタンを操作するためのもの*/
   display: none
  }


</style>

