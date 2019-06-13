<template>
  <div>
    <h2>MAP</h2>
    <div id="map" style="height:500px;">aaa</div>
    <br>
    <a @click="create()">ﾎﾟｲﾝﾄ作成画面に遷移（仮）</a>
    <br>
    <a @click="edit()">ﾎﾟｲﾝﾄ編集に遷移（仮）</a>
  </div>
</template>

<script>

// import Point from '../model/Point'
export default {
  data () {
    return {
    }
  },
  // 単なる地図の表示のみ
  mounted() {
    var MyLatLng = new google.maps.LatLng(35.6811673, 139.7670516);
    var Options = {
    zoom: 15,      //地図の縮尺値
    center: MyLatLng,    //地図の中心座標
    mapTypeId: 'roadmap'   //地図の種類
    };
    var map = new google.maps.Map(document.getElementById('map'), Options);
  },
  created() {
    // const point = new Point(11, 43);
    // console.log(point.getPos());
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
#map { height: 100%; width: 100%}
</style>



