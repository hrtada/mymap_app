/* eslint-disable no-console */
//import  MymapPoint from '../model/MymapPoint';
import  firebaseApp from '../../../firebase';
const request = require('request');

export default class MymapPointServiceMysql {
  constructor(){  
    this.storage = firebaseApp.storage();
  }

//ポイントの新規登録
create(userId, point)  {
    const options = {
      url: "http://192.168.56.1:8000/pointcreate",
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
    request(options, (error, response, body) => {
      console.log(error);
      console.log(response);
      console.log(body);
    });
}

//ポイントの修正登録
update(userId, point)  {
  const options = {
    url: "http://192.168.56.1:8000/pointupdate",
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
  request(options, (error, response, body) => {
    console.log(error);
    console.log(response);
    console.log(body);
  });
}

//ポイントの削除
 delete(id){
  return new Promise((resolve, reject) => {
    const options = {
      url: "http://192.168.56.1:8000/pointdelete",
      method: "POST",
      timeout: 5000,
      form: { id : id}
    }
    try{
      request(options, (error, response, body) => {
        console.log(error);
        console.log(response);
        console.log(body);
        resolve();
    });
    }catch(error){
      reject();
    }
  })
}

//ポイントの検索
    //選択したラベル情報を送る
     sendtoLabel(checkedLabel,userId) {
      return new Promise((resolve, reject) => {
        const options = {
          url: "http://192.168.56.1:8000/pointserch",
          method: "POST",
          timeout: 5000,
          form: {
            checkedLabel: checkedLabel,
            userId: userId
          }
        };
        try{
          request(options, (error, response, body) => {
            console.log(error);
            console.log(response);
            console.log(body);
            resolve();
        });
        }catch(error){
          reject();
        }
      })
    }

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
        //console.log( 'mapPoints', mapPoints );
      })  
    }

//クリックしたマーカーの詳細の表示
    //クリックしたマーカーの緯度経度を送る
      sendtoLatlng(userId,lat,lng){
        return new Promise((resolve, reject) => {
          const options = {
            url: "http://192.168.56.1:8000/pointdetail",
            method: "POST",
            timeout: 5000,
            form: { 
              userId: userId,
              lat: lat,
              lng: lng
            }
          };
          try{
          request(options, (error, response, body) => {
            console.log(error);
            console.log(response);
            console.log(body);
            resolve();
          });
        } catch(error){
          reject();
        }
        })
      }

    //ポイントの詳細情報を受け取る
    showPointDetail(){
      return new Promise((resolve, reject) => {
        const mapPoints = [];
        const option = {
            url: 'http://192.168.56.1:8000/pointdetail',
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
        })
      })  
    }

    //starageへ画像をアップロード
    uploadImage(userId,imageName,imageFile){
      return new Promise((resolve, reject) => {
        const storageRef = firebaseApp.storage().ref();
        const mountainsRef = storageRef.child(`${userId}/${imageName}`);
        let imageUrl = '';
      
      // ファイルを適用してファイルアップロード開始
        mountainsRef.put(imageFile).then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            imageUrl = downloadURL
            }).then(()=> {
            console.log('success upload image');
            resolve(imageUrl);
            }).catch(() =>{
            console.error('Error upload image');
            reject();
          });
        });     
      })
    }

    //画像の削除
    deleteImage(userId,imageName){
      try {
        const storageRef = firebaseApp.storage().ref();
        const delRef = storageRef.child(`${userId}/${imageName}`);
        delRef.delete();
        console.log('Success Delete image');
      } catch(error){
        console.log('Error Delete Image');
      }

    }

}