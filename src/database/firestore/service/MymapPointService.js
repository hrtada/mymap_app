/* eslint-disable no-console */

import  firebaseApp from '../../../firebase';
import  MymapPoint from '../model/MymapPoint';
// 定数を使えばfirestore側のデータ移行をしたときでも変更箇所をここだけにできる
const pCollectionName = 'mymap';
const collectionName = 'point';

export default class MymapPointService {
    constructor(){
        this.db = firebaseApp.firestore();
        this.storage = firebaseApp.storage();
    }
    //ポイントの新規登録
    create(userId, point) {
        return new Promise((resolve, reject) => {
          //const firestore = firebaseApp.firestore();
          this.db.collection(pCollectionName).doc(userId).collection(collectionName).add({
            lat: point.lat,
            lng: point.lng,
            label: point.label,
            date: point.date,
            memo: point.memo,
            imageUrl: point.imageUrl,
            imageName: point.imageName,
          }).then(()=> {
            console.log('success create MymapPoint');
            resolve('true');
          }).catch(function (error) {
            console.error('Error adding document: ', error);
            reject('false');
          }); 
        });
      }

      //ポイントの修正登録
      edit(userId,point) {
        return new Promise((resolve, reject) => {
          //const firestore = firebaseApp.firestore();
          this.db.collection(pCollectionName).doc(userId).collection(collectionName).doc(point.id).set({
            lat: point.lat,
            lng: point.lng,
            label: point.label,
            date: point.date,
            memo: point.memo,
            imageUrl: point.imageUrl,
            imageName: point.imageName,
          }).then(()=> {
            console.log('success edit MymapPoint');
            resolve('true');
          }).catch(function (error) {
            console.error('Error edit document: ', error);
            reject('false');
          }); 
        });
      }
 
      //ポイントの検索
      searchByLabel(userId, label) {
        return new Promise((resolve, reject) => {
            const mapPoints = [];
            const posRef = this.db.collection(pCollectionName).doc(userId).collection(collectionName).where("label", "==", label);
            try {
                posRef.get().then(qs => {
                    qs.forEach(doc => {
                        let pData = doc.data();
                        let pId = doc.id
                        const mapPoint = new MymapPoint(pId,pData.lat, pData.lng, pData.label, pData.date, pData.memo, pData.imageUrl, pData.imageName);
                        mapPoints.push(mapPoint);
                    });
                    console.log(mapPoints);
                    resolve(mapPoints);
                });
            } catch (error) {
              reject(console.log('serch error'));
            }
        });
      }

      //クリックしたマーカーの詳細の表示
      showPointDetail(userId,lat,lng){
        return new Promise((resolve, reject) => {
        const mapPoints = [];
        const posRef = this.db.collection(pCollectionName).doc(userId).collection(collectionName).where("lat", "==",lat).where("lng", "==",lng);
        try {
          posRef.get().then(qs => {
              qs.forEach(doc => {
                  let pData = doc.data();
                  let pId = doc.id
                  const mapPoint = new MymapPoint(pId,pData.lat, pData.lng, pData.label, pData.date, pData.memo, pData.imageUrl, pData.imageName);
                  mapPoints.push(mapPoint);
              });
              resolve(mapPoints);
            });
        } catch (error) {
          reject(console.log('show error'));
        }
        });
      }

    //ポイントの上書登録
    update(userId, point) {
      return new Promise((resolve, reject) => {
        //const firestore = firebaseApp.firestore();
        this.db.collection(pCollectionName).doc(userId).collection(collectionName).doc(point.id).set({
          lat: point.lat,
          lng: point.lng,
          label: point.label,
          date: point.date,
          memo: point.memo,
          imageUrl: point.imageUrl,
          imageName: point.imageName,
        }).then(()=> {
          console.log('success update MymapPoint');
          resolve('true');
        }).catch(function (error) {
          console.error('Error update document: ', error);
          reject('false');
        }); 
      });
    }    
      
    //ポイントの削除
    dell(userId,id){
      return new Promise((resolve, reject) => {
        this.db.collection(pCollectionName).doc(userId).collection(collectionName).doc(id).delete()
        .then(()=> {
          console.log('success delete MymapPoint');
          resolve('true');
        }).catch(() =>{
          console.error('Error delete document');
          reject('false');
        })
        });      
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

