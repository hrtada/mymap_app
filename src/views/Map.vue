<template>
  <div>
    <h2>MAP</h2>
    <div>
      <button @click="">範囲指定</button> 
      <button @click="">設定</button>
    </div>
    <input v-model="pVal.lng" />
    <div id="map"></div> <!--style="height:500px;"-->
    <br>
    <a @click="create()">ﾎﾟｲﾝﾄ作成画面に遷移（仮）</a>
    <br>
    <a @click="edit()">ﾎﾟｲﾝﾄ編集に遷移（仮）</a>
  </div>
</template>

<script>
import Point from '../model/Point'
export default {
  data () {
    return {
      pVal : null
    }
  },
  created() {
    const point = new Point(11, 43);
    this.pVal = point.getPos();
    console.log(this.pVal);
  },
  mounted() {
    var MyLatLng = new google.maps.LatLng(this.pVal.lat, this.pVal.lng);
    var Options = {
    zoom: 15,      //地図の縮尺値
    center: MyLatLng,    //地図の中心座標
    mapTypeId: 'roadmap'   //地図の種類
    };
    var map = new google.maps.Map(document.getElementById('map'), Options);
  }, 
  methods: {
    create(){
      this.$router.push({ path: "/pointcreate" });     
    },
    edit(){
      this.$router.push({ path: "/pointedit"})
    }
  }
}
</script>

<style>
#map { height: 500px; width: 100%}
</style>



