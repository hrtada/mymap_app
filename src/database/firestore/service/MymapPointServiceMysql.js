/* eslint-disable no-console */
//import  MymapPoint from '../model/MymapPoint';
import firebaseApp from "../../../firebase";
//const request = require('request');
const doRequest = require("../../../interface/asyncRequest");
const svUrl = "http://192.168.56.1:8000/";
//const svUrl = "https://achieved-property.glitch.me/";

export default class MymapPointServiceMysql {
  constructor() {
    this.storage = firebaseApp.storage();
  }

  //ポイントの新規登録
  async create(userId, point) {
    const options = {
      url: svUrl + "pointcreate",
      method: "POST",
      timeout: 5000,
      form: {
        id: point.id,
        lat: point.lat,
        lng: point.lng,
        labelId: point.label,
        date: point.date,
        memo: point.memo,
        imageUrl: point.imageUrl,
        imageName: point.imageName,
        userId: userId
      }
    };
    try {
      const tokenResult = await doRequest.doRequest(options);
      return tokenResult;
    } catch (error) {
      throw error;
    }
  }

  //ポイントの修正登録
  async update(userId, point) {
    const options = {
      url: svUrl + "pointupdate",
      method: "POST",
      timeout: 5000,
      form: {
        id: point.id,
        lat: point.lat,
        lng: point.lng,
        labelId: point.label,
        date: point.date,
        memo: point.memo,
        imageUrl: point.imageUrl,
        imageName: point.imageName,
        userId: userId
      }
    };
    try {
      const tokenResult = await doRequest.doRequest(options);
      return tokenResult;
    } catch (error) {
      throw error;
    }
  }

  //ポイントの削除
  async delete(id) {
    const options = {
      url: svUrl + "pointdelete",
      method: "POST",
      timeout: 5000,
      form: { id: id }
    };
    try {
      const tokenResult = await doRequest.doRequest(options);
      return tokenResult;
    } catch (error) {
      throw error;
    }
  }

  //ポイントの検索
  //選択したラベル情報を送る
  async sendtoLabel(checkedLabel, userId, startDate, endDate) {
    const options = {
      url: svUrl + "pointserch",
      method: "POST",
      timeout: 5000,
      form: {
        checkedLabel: checkedLabel,
        userId: userId,
        startDate: startDate,
        endDate: endDate
      }
    };
    try {
      const tokenResult = await doRequest.doRequest(options);
      return tokenResult;
    } catch (error) {
      throw error;
    }
  }

  async searchByLabel() {
    const mapPoints = [];
    const options = {
      url: svUrl + "pointserch",
      method: "GET",
      json: true
    };

    try {
      const tokenResult = await doRequest.doRequest(options);
      for (let i = 0; i < tokenResult.length; i++) {
        mapPoints.push({
          id: tokenResult[i].id,
          lat: tokenResult[i].lat,
          lng: tokenResult[i].lng,
          label: tokenResult[i].labelId,
          date: tokenResult[i].date,
          memo: tokenResult[i].memo,
          imageUrl: tokenResult[i].imageUrl,
          imageName: tokenResult[i].imageName
        });
      }
      return mapPoints;
    } catch (error) {
      throw error;
    }
  }

  //クリックしたマーカーの詳細の表示
  //クリックしたマーカーの緯度経度を送る
  async sendtoLatlng(userId, lat, lng) {
    const options = {
      url: svUrl + "pointdetail",
      method: "POST",
      timeout: 5000,
      form: {
        userId: userId,
        lat: lat,
        lng: lng
      }
    };
    try {
      const tokenResult = await doRequest.doRequest(options);
      return tokenResult;
    } catch (error) {
      throw error;
    }
  }

  //ポイントの詳細情報を受け取る
  async showPointDetail() {
    const mapPoints = [];
    const options = {
      url: svUrl + "pointdetail",
      method: "GET",
      json: true
    };
    try {
      const tokenResult = await doRequest.doRequest(options);
      for (let i = 0; i < tokenResult.length; i++) {
        mapPoints.push({
          id: tokenResult[i].id,
          lat: tokenResult[i].lat,
          lng: tokenResult[i].lng,
          label: tokenResult[i].labelId,
          date: tokenResult[i].date,
          memo: tokenResult[i].memo,
          imageUrl: tokenResult[i].imageUrl,
          imageName: tokenResult[i].imageName
        });
      }
      return mapPoints;
    } catch (error) {
      throw error;
    }
  }

  //starageへ画像をアップロード
  uploadImage(userId, imageName, imageFile) {
    return new Promise((resolve, reject) => {
      const storageRef = firebaseApp.storage().ref();
      const mountainsRef = storageRef.child(`${userId}/${imageName}`);
      let imageUrl = "";

      // ファイルを適用してファイルアップロード開始
      mountainsRef.put(imageFile).then(snapshot => {
        snapshot.ref
          .getDownloadURL()
          .then(downloadURL => {
            imageUrl = downloadURL;
          })
          .then(() => {
            console.log("success upload image");
            resolve(imageUrl);
          })
          .catch(() => {
            console.error("Error upload image");
            reject();
          });
      });
    });
  }

  //画像の削除
  deleteImage(userId, imageName) {
    try {
      const storageRef = firebaseApp.storage().ref();
      const delRef = storageRef.child(`${userId}/${imageName}`);
      delRef.delete();
      console.log("Success Delete image");
    } catch (error) {
      console.log("Error Delete Image");
    }
  }
}
