/* eslint-disable no-console */
import  firebaseApp from '../../../firebase';
//const request = require('request');
const doRequest = require('../../../interface/asyncRequest');
//const svUrl = 'http://192.168.56.1:8000/';
const svUrl = 'https://achieved-property.glitch.me/';

export default class MymapLabelServiceMysql{
    constructor(){  
        this.storage = firebaseApp.storage();
    }

//ラベルの取得
async getLabel(){
        let mapLabels = [];
        const options = {
            url: svUrl + 'labelget',
            method: 'GET',
            json: true
        }
        try{
            const tokenResult = await doRequest.doRequest(options);
                for(let i=0; i<tokenResult.length; i++){
                    mapLabels.push({id:tokenResult[i].labelId, name:tokenResult[i].labelName});
                }
                return(mapLabels);
            
        } catch (error) {
            throw error;
          }

}

//ラベルの更新
async updateLabel(labelId,labelName){
    const options = {
        url: svUrl + 'labelupdate',
        method: "POST",
        timeout: 5000,
        form: {
            labelId : labelId,
            labelName : labelName
        }
    }
    try {
        await doRequest.doRequest(options);
        return true;
      } catch (error) {
        throw error;
      }
}

//ラベルの追加
async addLabel(labelName, userId) {
    const options = {
      url: svUrl +'labeladd',
      method: 'POST',
      timeout: 5000,
      form: {
        userId: userId,
        labelName: labelName
      }
    };
    try {
      await doRequest.doRequest(options);
      return true;
    } catch (error) {
      throw error;
    }
  }

//ラベルの削除
    //削除対象のlabelIdを送る
    async getdelLabel(labelId){
        const options = {
            url: svUrl + 'labeldelete',
            method: "POST",
            timeout: 5000,
            form: {
                labelId : labelId,
            }
        }
        try {
            const tokenResult = await doRequest.doRequest(options);
            return tokenResult;
            } catch (error) {
            throw error;
            }
        
    }

    //削除するラベルを使用したポイント情報を受け取る
    async searchByDelLabel(){
        const delMapPoints = [];
        const options = {
            url: svUrl + 'labeldelete',
            method: 'GET',
            json: true
        }
        try {
            const tokenResult = await doRequest.doRequest(options);
            for(let i=0; i<tokenResult.length; i++){
                delMapPoints.push({
                    id: tokenResult[i].id, 
                    imageUrl:  tokenResult[i].imageUrl,
                    imageName:  tokenResult[i].imageName,
                    userId : tokenResult[i].userId
                });
            }
            return(delMapPoints);
        } catch (error) {
        throw error;
        }
    
    }

    //削除を実行する
    async deleteLabel(){
        const options = {
            url: svUrl + 'labeldeleterun',
            method: "POST",
            timeout: 5000,
        }
        try {
            await doRequest.doRequest(options);
            return true;
            } catch (error) {
            throw error;
            }
        
    }

}