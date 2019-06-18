export default class Point {
    constructor(long, lat) {
        this.long = long;   // 緯度
        this.lat = lat;     // 経度
    }
    getPos(){
        return {long: this.long, lat: this.lat};
    }
}