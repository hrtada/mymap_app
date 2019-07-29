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
        </div> 
      </div>
    </div> 
  </div>

  <div id ='map'></div>
    <!--後で削除画面遷移確認のための仮リンク-->
    <a @click="edit()">ﾎﾟｲﾝﾄ編集に遷移（仮）</a>

  <!--modal1-->
    <div class="modal_wrap">
      <input type="checkbox" id="trigger1">
        <div class="modal_overlay">
        <div class="modal_content">
            <label for="trigger1" class="close_button">✖️</label>
            <h1 class="has-text-weight-bold">条件指定</h1>
            <p>＜ラベルの選択＞</p>
            <ul>
              <li v-for="item in labels" v-bind:key="item.id">  {{item.name}}</li>
            </ul>
            <button @click="show()">表示</button>
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
        <button @click="create()">新規登録</button>
      </div>
    </div>
</div>
</template>

<script>
/* eslint-disable no-console */
/*globals google */
import 'bulma/css/bulma.css';//CSSフレームワーク

export default {

   data () {
    return {
      labels: [//最終的にfirestoreから取得するようにする
        { id:1, name:'パン屋'},
        { id:2, name:'駐輪場'},
        { id:2, name:'ラーメン屋'}
      ]
    } 
  },

  created() {
   },

  mounted() {
    let map;
    let createPos;

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

/*       //マーカーをクリック時したら削除
      marker.addListener('click', () => {
        marker.setMap(null);a
      }); */

      // マーカークリックで情報ウィンドウを表示
      let info = new google.maps.InfoWindow({
        content:document.getElementById('infowindw')
      }); 
      
      marker.addListener('click', ()=> {
        info.open(map, marker);
        createPos = marker.getPosition();
        console.log(createPos);
      });    

//★2019/07/25MapShow.vueへ移動する
      //マーカーをクリック時したら削除
/*       marker.addListener('click', () => {
        //クリックしたマーカーの座標を取得
        const dellatlng = marker.getPosition();
        console.log('削除対象の座標',dellatlng.lat(),dellatlng.lng());
        //firebaseのdataと照合し、座標が一致したデータのidを返す
        db.collection("user1").where("lat","==",dellatlng.lat()).where("lng","==",dellatlng.lng())
          .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const doc_id = doc.id;
              console.log('削除対象のID',doc_id);
              db.collection("user1").doc(doc_id).delete().then(() => {//該当データを削除
                console.log("削除成功");
              });
              marker.setMap(null);//マーカーを削除
            });          
          });            
      }); */
    }    

//★2019/07/25MapShow.vueへ移動する。条件設定でフィルタするため、最初に表示しない。
    //コレクションitamotoの値を全取得しマーカーを表示
/*     db.collection("user1").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        //console.log('DBからの取得値%O', data);
        makeMaker(data['lat'], data['lng'], 'pointName');
      });
    }); */

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
    edit(){
      this.$router.push({ path: "/pointedit"});
    },
    show(){
      this.$router.push({ path: "/mapshow"});
    },
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

