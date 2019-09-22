/* eslint-disable no-console */

export default class MymapPoint {
    constructor(id,lat, lng, label, date, memo, imageUrl, imageName) {
      this.id = id;
      this.lat = lat;
      this.lng = lng;
      this.label = label;
      this.date = date;
      this.memo = memo;
      this.imageUrl = imageUrl;
      this.imageName = imageName;
    }
}
