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
import MymapPointService from '../database/firestore/service/MymapPointService'

export default {
   data () {
     return{
     }
  },

  computed:{
    editLat(){return this.$store.getters.editLat},//storeと同期する
    editLng(){return this.$store.getters.editLng}
  },
  
  mounted() {
    let map;

    //地図を表示
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
  
    //マーカーを表示する関数
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
      const checked = this.$store.state.checked;

      const getMapPointList = async()=>{
        const mymapPointService = new MymapPointService();
        const lists = await mymapPointService.searchByLabel(this.$store.state.userUid, checked);//ポイント情報を取得

        //マーカーを表示
        for(let i=0; i<lists.length; i++){
          makeMaker(lists[i].lat,lists[i].lng);
          }
        //表示データの有無をチェック
          //console.log(lists);
        if(lists.length == 0){
          alert('表示するデータがありません');
          this.$router.push({ path: "/map" });
        }else{
        //全マーカーが表示されるように調整
        map.fitBounds (bounds);
        }     
      };
      getMapPointList();

      // const posRef = db.collection('mymap').doc(this.$store.state.userUid).collection('point').where("label","==",checked);    
      // posRef.get().then(qs => {
      //   qs.forEach(doc => {
      //     let posData = doc.data();
      //     //this.memo = posData['memo'];
      //       makeMaker(posData['lat'], posData['lng']);     
      //   });
      //   if(bounds.ja.g==180,bounds.ja.h==-180){
      //     alert('表示するデータがありません');
      //     this.$router.push({ path: "/map" }); 
      //   }else{
      //   map.fitBounds (bounds);//全マーカーが表示されるように調整
      //   }
      // });     
        
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

