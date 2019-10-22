<template>
  <div>
    <div class="hero is-primary">
      <div class="hero-header">
        <div class="field is-grouped">
          <div class="control">
            <section class="">
              <article class="">
                <div class="toggle">
                  <label>条件指定</label>
                </div>
                <div class="">
                  <div class="">
                    <p class="has-text-weight-bold">ラベルの選択</p>
                    <ul>
                      <li
                        v-for="item in myLabel"
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


                    <label-mnt></label-mnt>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div id='map'></div>

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
import bulmaAccordion from "bulma-extensions/bulma-accordion/dist/js/bulma-accordion.js"; //blumaのextenionをimport
import "bulma-extensions/bulma-accordion/dist/css/bulma-accordion.min.css";
import "bulma/css/bulma.css"; //CSSフレームワーク
import MymapPointServiceMysql from "../database/firestore/service/MymapPointServiceMysql";
import LabelMnt from "./LabelMnt.vue";
export default {
  data() {
    return {
      map: null,
      accordions: [], //bulmaのアコーディオンメニューを使うために必要
      myLabel: [{id:1,name:'aa'},{id:2,name:'bb'}],//this.$store.getters.label,
      checked: null //条件設定のラジオボタンの値
    };
  },
  components: {
    LabelMnt
  },
  computed: {
    newLat() {
      return this.$store.getters.newLat;
    }, //storeのgetterと同期する
    newLng() {
      return this.$store.getters.newLng;
    },
  },

  mounted() {
    this.accordions = bulmaAccordion.attach(); //bulmaのアコーディオンメニューを使うために必要

    //地図を表示（下のforEach内にいれないこと）
    const initiallatLng = new google.maps.LatLng(35.708194, 139.808565);
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: initiallatLng,
      zoom: 15,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false
    });
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
      this.makeMaker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
  },
  methods: {
    create() {
      this.$router.push({ path: "/pointcreate" });
    },
    async show() {
      // if (this.checked == null) {
      //   alert("ラベルを選択してください。");
      //   return false;
      // } else {
      //this.$store.commit('setchecked',{checked: this.checked});//条件指定のチェックした値を渡す

      const mymapPointService = new MymapPointServiceMysql();
      // mymapPointService.sendtoLabel(this.checked);
      // this.$router.push({ path: "/mapshow" });
      const points = await mymapPointService.searchByLabel();

      for (let i = 0; i < points.length; i++) {
        console.log(points[i].lat + "  " + points[i].lng);
        this.makeMaker({ lat: points[i].lat, lng: points[i].lng });
      }
      // }
    },
    //マーカーを表示する関数を作成
    makeMaker({ lat, lng }) {
      const latLng = new google.maps.LatLng(lat, lng);
      const marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        animation: google.maps.Animation.DROP
      });

      // マーカークリックで情報ウィンドウを表示
      let info = new google.maps.InfoWindow({
        content: document.getElementById("infowindw")
      });

      marker.addListener("click", () => {
        info.open(this.map, marker);
        const mLat = marker.getPosition().lat(); //緯度情報を渡す
        const mLng = marker.getPosition().lng();
        this.$store.commit("setnewLat", { newLat: mLat }); //store.stateに渡す
        this.$store.commit("setnewLng", { newLng: mLng });
      });
    },
    labelMnt() {
      this.$router.push({ path: "/labelmnt" });
    }
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

