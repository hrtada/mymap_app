<template>
<div>
  <div class="hero is-primary">
    <div class="hero-header">
      <div class="field is-grouped">
        <div class="control">
        <section class="accordions">
          <article class="accordion">
            <div class="accordion-header toggle">
              <label>条件指定</label>
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                <p class="has-text-weight-bold">ラベルの選択</p>
                <ul>
                <li v-for="item in $store.state.label" :key="item.name">
                  <label><input type="radio" name="label" :value="item.name" v-model="checked">
                  {{ item.name }}
                  </label>
                </li>
                </ul>
                <button @click="show()">表示</button>
              </div>
            </div>
          </article>
        </section>
        </div>
        <div class="control">
        <section class="accordions">
          <article class="accordion">
            <div class="accordion-header toggle">
              <label>設定</label>
            </div>
            <div class="accordion-body">

              <div class="accordion-content">
                <button class="button is-light" @click="labelMnt()">ラベルの設定</button>
              </div>
            </div>
          </article>
        </section>
        </div>
      </div>
    </div> 
  </div>

  <div id ='map'></div>

    <!--情報ウィンドウ※-->
    <div id="iw_wrapper">
      <div id="infowindw">
        <button @click="create()">新規登録</button>
      </div>
    </div>
</div>
</template>

<script>
/*eslint-disable no-console */
/*globals google */
import bulmaAccordion from 'bulma-extensions/bulma-accordion/dist/js/bulma-accordion.js';//blumaのextenionをimport
import 'bulma-extensions/bulma-accordion/dist/css/bulma-accordion.min.css'
import 'bulma/css/bulma.css';//CSSフレームワーク
import db from '../firestore';

export default {
   data () {
    return{
      accordions : [],//bulmaのアコーディオンメニューを使うために必要
      checked :null//条件設定のラジオボタンの値
     }
  },

  computed:{
    newLat(){return this.$store.getters.newLat},//storeのgetterと同期する
    newLng(){return this.$store.getters.newLng},
    label(){return this.$store.getters.label},
  },

  mounted() {
  let map;
  this.accordions = bulmaAccordion.attach()//bulmaのアコーディオンメニューを使うために必要

  //ラベル情報を取得し、storeに渡す
  const labelRef = db.collection('user1').doc('option').collection('label'); 
  labelRef.get().then(querySnapshot => {
  const label = querySnapshot.docs.map(doc => doc.data());
  this.$store.commit('setlabel',{label: label});
  });

    //地図を表示（下のforEach内にいれないこと）
    const initiallatLng = new google.maps.LatLng(35.708194, 139.808565);
    map = new google.maps.Map(document.getElementById('map'), {
      center: initiallatLng,
      zoom: 15,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false
    }); 
    //現在地を取得し、地図中央で再表示
    navigator.geolocation.getCurrentPosition((position)=> {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
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
        const mLat = marker.getPosition().lat();//緯度情報を渡す
        const mLng = marker.getPosition().lng();
        this.$store.commit('setnewLat', {newLat: mLat});//store.stateに渡す
        this.$store.commit('setnewLng', {newLng: mLng});
      });    
    }    
    //マップをクリック時、マーカー表示する
    map.addListener('click', (e) => {
    //マーカーを表示する
      makeMaker(e.latLng.lat(),e.latLng.lng(), e.latLng.toString());
    });
  },

  methods: {
    create(){
      this.$router.push({ path: "/pointcreate" });     
    },
    show(){
      if(this.checked == null ){
        alert("ラベルを選択してください。");
        return false;
      }else{     
      this.$store.commit('setchecked',{checked: this.checked});//条件指定のチェックした値を渡す
      this.$router.push({ path: "/mapshow"});
      }
    },
    labelMnt(){
    this.$router.push({ path: "/labelmnt" });     
    },
  }
}
</script>

<style> 
 #map{ 
   height: 500px;
   }
 #iw_wrapper{/*情報ウィンドウからボタンを操作するためのもの*/
   display: none
 }

</style>

