/*globals google */
export default class MyGoogleMap {
  constructor(mapElement) {
    this.el = mapElement;
    const initiallatLng = new google.maps.LatLng(35.708194, 139.808565);
    this.map = new google.maps.Map(mapElement, {
      center: initiallatLng,
      zoom: 15,
      maxZoom: 15,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false
    });
    this.bounds = new google.maps.LatLngBounds();
  }

  async getMapInstance() {
    return this.map;
  }

  async setCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.map.setCenter(pos);
    });
  }

  //マーカーを表示する関数を作成
  makeMaker({ lat, lng, clickFunction }) {
    const latLng = new google.maps.LatLng(lat, lng);
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      animation: google.maps.Animation.DROP
    });
    //マーカーの表示領域を調整のための位置座標を取得
    this.bounds.extend( marker.position );
    
    //マーカークリック時イベント
    marker.addListener("click", () => {
      clickFunction(marker);
    });
    return marker;
  }
}
