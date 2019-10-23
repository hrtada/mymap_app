/* eslint-disable no-console */
const request = require('request');

export default class MymapLabelServiceMysql{

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
addLabel(labelName,userId){
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
}

//ラベルの削除

}