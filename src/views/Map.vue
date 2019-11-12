<template>
  <div>
    <div class="hero is-primary">
      <div class="hero-header">
          </div>
</div>

  <!-- <nav class="navbar is-primary" role="navigation" aria-label="dropdown navigation">
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">
        条件指定
      </a>
      <div class="navbar-dropdown">
        <a class="navbar-item">
          <p class="has-text-weight-bold">ラベルの選択</p>
        </a>
        <a class="navbar-item">
          <ul>
            <li
              v-for="item in label"
              :key="item.id"
            >
            <label><input
              type="radio"
              name="label"
              :value="item.id"
              v-model="checked"
            >
              {{ item.name }}
            </label>
            </li>
            <button class="button is-link is-small" @click="show()">表示</button>
            </ul>
        </a>
      </div>
    </div>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      ラベル編集
    </a>
      <div class="navbar-dropdown">
        <a class="navbar-item">
          <label-mnt></label-mnt>
        </a>
      </div>
    </div>   
</nav> -->
<nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
            <li>
              <a href="#">条件指定</a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav uk-list">
                    <p class="has-text-weight-bold">ラベルの選択</p>
                    <li
                      v-for="item in label"
                      :key="item.id"
                    >
                    <label><input
                      type="radio"
                      name="label"
                      :value="item.id"
                      v-model="checked"
                    >
                      {{ item.name }}
                    </label>
                    </li>
                    <p class="has-text-weight-bold">日付</p>
                    <input class="input is-small" type="date" v-model="startDate">
                     ～
                    <input class="input is-small" type="date" v-model="endDate">
                    <button class="button is-link is-small" @click="show()">表示</button>
                  </ul>
                </div>
            </li>
            <li>
              <a href="#">ラベル編集</a>
              <div class="uk-navbar-dropdown uk-navbar-dropdown-width-2">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                      <label-mnt></label-mnt>
                  </ul>
              </div>
            </li>
        </ul>
  </div>
</nav>

    <div id='map'></div>

    <!--情報ウィンドウ※-->
    <div id="iw_wrapper">
      <div id="infowindw_new">
        <button @click="create()">新規登録</button>
      </div>
      <div id="infowindw_get">
        <button @click="edit()">詳細表示</button>
      </div>
    </div>

    
  </div>
</template>

<script>
/*eslint-disable no-console */
/*globals google */
//import bulmaAccordion from "bulma-extensions/bulma-accordion/dist/js/bulma-accordion.js"; //blumaのextenionをimport
//import "bulma-extensions/bulma-accordion/dist/css/bulma-accordion.min.css";
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import 'uikit/dist/css/uikit.css'
import 'uikit/dist/css/uikit.min.css'
UIkit.use(Icons)
import "bulma/css/bulma.css"; //CSSフレームワーク
import MymapPointServiceMysql from "../database/firestore/service/MymapPointServiceMysql";
import LabelMnt from "./LabelMnt.vue";

export default {
  data() {
    return {
      map: null,
      bounds: null,
      Makers: [],
      //accordions: [], //bulmaのアコーディオンメニューを使うために必要
      checked: null, //条件設定のラジオボタンの値
      startDate: null,
      endDate: null,
    };
  },

    components: {
    LabelMnt
  },

  computed: {
    lat() {
      return this.$store.getters.lat;
    }, //storeのgetterと同期する
    lng() {
      return this.$store.getters.lng;
    },
    label() {
      return this.$store.getters.label;
    }
  },

  mounted() {
    //this.accordions = bulmaAccordion.attach(); //bulmaのアコーディオンメニューを使うために必要

    //地図を表示（下のforEach内にいれないこと）
    const initiallatLng = new google.maps.LatLng(35.708194, 139.808565);
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: initiallatLng,
      zoom: 15,
      maxZoom: 15,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false
    });
    this.bounds = new google.maps.LatLngBounds();

    //現在地を取得し、地図中央で再表示
    navigator.geolocation.getCurrentPosition(position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.map.setCenter(pos);
    });

    //マップをクリック時、マーカー表示する
    this.map.addListener("click", e => {
      //マーカーを表示する
      const newMaker = this.makeMaker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      this.markerClick(newMaker,'infowindw_new');
    });
  },

  methods: {
    create() {
      this.$router.push({ path: "/pointcreate" });
    },
    
    edit(){
      this.$router.push({ path: "/pointedit"});
    },

    async show() {
      if (this.checked == null) {
        alert("ラベルを選択してください。");
      }else {
        //DBからポイント情報を取得する
        const mymapPointServiceMysql = new MymapPointServiceMysql();
        await mymapPointServiceMysql.sendtoLabel(this.checked,this.$store.state.userUid,this.startDate,this.endDate); //チェックしたラベルを渡す
        const lists = await mymapPointServiceMysql.searchByLabel();//queryした結果を受け取る

        //表示データの有無をチェック
        if(lists.length == 0){
          alert('表示するデータがありません');
          //this.$router.push({ path: "/map" });
        }else{
          //マーカーをクリア
          if(this.Makers.length > 0){
            for(let i=0; i < this.Makers.length; i++){
               this.Makers[i].setMap(null);
            } 
            this.Makers = [];
          }

          //マーカーを表示
          for(let i=0; i<lists.length; i++){
            const getMaker = this.makeMaker({lat: lists[i].lat,lng: lists[i].lng});
            this.markerClick (getMaker,'infowindw_get');
            //マーカークリアのため保存
            this.Makers.push(getMaker);
            //全マーカーが表示されるように調整
            this.map.fitBounds (this.bounds);
          }
        }       
      }
    },

    //マーカーを表示する関数を作成
    makeMaker({ lat, lng }) {
      const latLng = new google.maps.LatLng(lat, lng);
      const marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        animation: google.maps.Animation.DROP
      });
      //マーカーの表示領域を調整のための位置座標を取得
      this.bounds.extend (marker.position);
      return marker;
    },

    //マーカークリック時の関数を作成
    markerClick(marker,infowindw){
      // マーカークリックで情報ウィンドウを表示
      let info = new google.maps.InfoWindow({
      content: document.getElementById(infowindw)
      });

      marker.addListener("click", () => {
        info.open(this.map, marker);
        const mLat = marker.getPosition().lat(); //緯度情報を渡す
        const mLng = marker.getPosition().lng();
        this.$store.commit("setlat", { lat: mLat }); //store.stateに渡す
        this.$store.commit("setlng", { lng: mLng });
      });
    },

    labelMnt() {
      this.$router.push({ path: "/labelmnt" });
    },

  }
};
</script>

<style>
#map {
  height: 700px;
}
#iw_wrapper {
  /*情報ウィンドウからボタンを操作するためのもの*/
  display: none;
}

</style>

