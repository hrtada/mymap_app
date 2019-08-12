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
import db from '../firestore';
import 'bulma/css/bulma.css';//CSSフレームワーク


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
      //マーカーの表示領域を調整
      let bounds = new google.maps.LatLngBounds();
      bounds.extend (marker.position);
      map.fitBounds (bounds);

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
    //コレクションuser１と条件指定で選択したラベル情報から取得しマーカー表示
      const checked = this.$store.state.checked
      const posRef = db.collection('user1').where("label","==",checked);
      posRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        let data = doc.data();
        makeMaker(data['lat'], data['lng'], 'pointName');
        });
    })

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

</style>

