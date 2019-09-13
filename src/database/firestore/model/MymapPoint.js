export default class MymapPoint {
    constructor(lat, lng, label, date, memo, imageUrl, imageName) {
      this.id = 0;
      this.lat = lat;
      this.lng = lng;
      this.label = label;
      this.date = date;
      this.memo = memo;
      this.imageUrl = imageUrl;
      this.imageName = imageName;
    }
}