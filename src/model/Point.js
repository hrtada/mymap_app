export default class Point {
    constructor(lng, lat) {
        this.lng = lng;   // 緯度
        this.lat = lat;     // 経度
    }
    getPos(){
        return {lng: this.lng, lat: this.lat};
    }
}