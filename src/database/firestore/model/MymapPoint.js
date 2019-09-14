/* eslint-disable no-console */
import  firebaseApp from '../../../firebase';
// 定数を使えばfirestore側のデータ移行をしたときでも変更箇所をここだけにできる
const pCollectionName = 'mymap';
const collectionName = 'point';
const queryName = 'label';

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

    create(userId) {
      const firestore = firebaseApp.firestore();
      firestore.collection(pCollectionName).doc(userId).collection(collectionName).add({
        lat: this.lat,
        lng: this.lng,
        label: this.label,
        date: this.date,
        memo: this.memo,
        imageUrl: this.imageUrl,
        imageName: this.imageName,
      }).then(()=> {
        console.log('success create MymapPoint');
        return true;

      }).catch(function (error) {
        console.error('Error adding document: ', error);
        throw error;
      }); 
    }

    del(userId,docId){
      const firestore = firebaseApp.firestore();
      firestore.collection(pCollectionName).doc(userId).collection(collectionName).doc(docId).delete(
      ).then(()=> {
        console.log('success delete MymapPoint');
        return true;
      }).catch(function (error) {
        console.error('Error delete document: ', error);
        throw error;
      });
    }

    reference(userId,checked){
      const firestore = firebaseApp.firestore();
      firestore.collection(pCollectionName).doc(userId).collection(collectionName).where(queryName,'==',checked
      )
    }

}