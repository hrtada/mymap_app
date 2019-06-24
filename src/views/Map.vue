<template>
  <div>
    <div id='settei'>
      <button @click="chancel()">範囲指定</button> 
      <button @click="chancel()">設定</button>
    </div>
   <!--  <input v-model="MylatLng" /> -->
    <div id = 'map'></div>
    <br>
    <a @click="create()">ﾎﾟｲﾝﾄ作成画面に遷移（仮）</a>
    <br>
    <a @click="edit()">ﾎﾟｲﾝﾄ編集に遷移（仮）</a>
    <br>
  </div>
</template>

<script>
//import Point from '../model/Point'
export default {
  data () {
    return {
      MylatLng : null
    }
  },
  created() {
    // const point = new Point(11, 43);
    // this.pVal = point.getPos();
    // console.log(this.pVal);
   },
  mounted() {
    if (!navigator.geolocation) {
        alert('Geolocation APIに対応していません');
        return false;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      // 成功した場合：緯度経度の取得
      this.MylatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(this.MylatLng);
 
      // 地図の表示
      const map = new google.maps.Map(document.getElementById('map'), {
        center: this.MylatLng,
        zoom: 15
      });
 
      // マーカーの追加
      const marker = new google.maps.Marker({
        position: this.MylatLng,
        map: map
      });
      //失敗した場合
    }, function() {
        alert('位置情報取得に失敗しました');
    });
  },
  methods: {
    create(){
      this.$router.push({ path: "/pointcreate" });     
    },
    edit(){
      this.$router.push({ path: "/pointedit"});
    }
  }
}
</script>

<style>
 #settei{float: right;}
 #map{ height: 500px;}

</style>

