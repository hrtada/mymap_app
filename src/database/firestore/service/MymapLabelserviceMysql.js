/* eslint-disable no-console */
import  firebaseApp from '../../../firebase';
const request = require('request');
const doRequest = require('../../../interface/asyncRequest');

export default class MymapLabelServiceMysql{
    constructor(){  
        this.storage = firebaseApp.storage();
    }

//ラベルの取得
    getLabel(){
        return new Promise((resolve, reject) => {
            let mapLabels = [];
            const option = {
                url: 'http://192.168.56.1:8000/labelget',
                method: 'GET',
                json: true
            }
            try{
                request(option, function (error, res, body) {
                    for(let i=0; i<body.length; i++){
                        mapLabels.push({id:body[i].labelId, name:body[i].labelName});
                    }
                    resolve(mapLabels);
                });
            } catch (error) {
                reject();
            }
        }) 
    }

//ラベルの更新
updateLabel(labelId,labelName){
    return new Promise((resolve, reject) => {
        const options = {
            url: "http://192.168.56.1:8000/labelupdate",
            method: "POST",
            timeout: 5000,
            form: {
                labelId : labelId,
                labelName : labelName
            }
        }
        try{
            request(options, (error, response, body) => {
              console.log(error);
              console.log(response);
              console.log(body);
              resolve(true);
          });
          }catch(error){
            reject();
          }
    })
}

//ラベルの追加
async addLabel(labelName, userId) {
    const options = {
      url: 'http://192.168.56.1:8000/labeladd',
      method: 'POST',
      timeout: 5000,
      form: {
        userId: userId,
        labelName: labelName
      }
    };
    try {
      const tokenResult = await doRequest(options);
      return tokenResult;
    } catch (error) {
      throw error;
    }
  }
/* addLabel(labelName,userId){
    return new Promise((resolve, reject) => {
        const options = {
            url: "http://192.168.56.1:8000/labeladd",
            method: "POST",
            timeout: 5000,
            form: {
                userId : userId,
                labelName : labelName
            }
        }
        try{
            request(options, (error, response, body) => {
              console.log(error);
              console.log(response);
              console.log(body);
              resolve(true);
          });
          }catch(error){
            reject();
          }
    })
} */

//ラベルの削除
    //削除対象のlabelIdを送る
    getdelLabel(labelId){
        return new Promise((resolve, reject) => {
            const options = {
                url: "http://192.168.56.1:8000/labeldelete",
                method: "POST",
                timeout: 5000,
                form: {
                    labelId : labelId,
                }
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

    //削除するラベルを使用したポイント情報を受け取る
    searchByDelLabel(){
        return new Promise((resolve, reject) => {
            const delMapPoints = [];
            const option = {
                url: 'http://192.168.56.1:8000/labeldelete',
                method: 'GET',
                json: true
            }
           
            request(option,function(error, res, body){
                if (!error && res.statusCode == 200) {
                for(let i=0; i<body.length; i++){
                    delMapPoints.push({
                        id: body[i].id, 
                        imageUrl:  body[i].imageUrl,
                        imageName:  body[i].imageName,
                        userId : body[i].userId
                    });
                }
                resolve(delMapPoints);
                } else {
                reject(error);
                }
            });
        })  
    }

    //削除を実行する
    deleteLabel(){
        return new Promise((resolve, reject) => {
            const options = {
                url: "http://192.168.56.1:8000/labeldeleterun",
                method: "POST",
                timeout: 5000,
            }
            try{
                request(options, (error, response, body) => {
                console.log(error);
                console.log(response);
                console.log(body);
                resolve(true);
            });
            }catch(error){
                reject();
            }
        })
    }

    // //画像の削除
    // deleteImage(userId,imageName){
    //     try {
    //       const storageRef = firebaseApp.storage().ref();
    //       const delRef = storageRef.child(`${userId}/${imageName}`);
    //       delRef.delete();
    //       console.log('Success Delete image');
    //     } catch(error){
 
    //         console.log('Error Delete Image');
    //     }
    //   }    

}