/* eslint-disable no-console */
import  MymapPoint from '../model/MymapPoint';
const request = require('request');

export default class MymapPointServiceMysql {

//ポイントの新規登録
create(userId, point)  {
    const options = {
      url: "http://192.168.56.1:8000/pointcreate",
      method: "POST",
      timeout: 5000,
      form: {
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
    request(options, (error, response, body) => {
      console.log(error);
      console.log(response);
      console.log(body);
    });
}
//ポイントの修正登録

//ポイントの検索
    //選択したラベル情報を送る
     sendtoLabel(checkedLabel) {
      const options = {
        url: "http://192.168.56.1:8000/pointserch",
        method: "POST",
        timeout: 5000,
        form: { checkedLabel: checkedLabel }
      };
      request(options, (error, response, body) => {
        console.log(error);
        console.log(response);
        console.log(body);
      });
    }

    //ポイント情報の取得
    searchByLabel(){
        return new Promise((resolve, reject) => {

        const mapPoints = [];
        const option = {
            url: 'http://192.168.56.1:8000/pointserch',
            method: 'GET',
            json: true
        }
        
        request(option,function(error, res, body){
            if (!error && res.statusCode == 200) {
              for(let i=0; i<body.length; i++){
                  mapPoints.push({
                      id: body[i].id, 
                      lat:  body[i].lat,
                      lng:  body[i].lng,
                      label:  body[i].labelId,
                      date: body[i].date,
                      memo:  body[i].memo,
                      imageUrl:  body[i].imageUrl,
                      imageName:  body[i].imageName
                  });
              }
              resolve(mapPoints);
            } else {
              reject(error);
            }
          });
          console.log( 'mapPoints', mapPoints );
        })  
    }

//クリックしたマーカーの詳細の表示

//ポイントの削除

//ラベル削除時のポイント削除



}