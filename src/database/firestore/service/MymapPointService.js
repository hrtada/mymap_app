import  firebaseApp from '../../../firebase';
import  MymapPoint from '../model/MymapPoint';
// 定数を使えばfirestore側のデータ移行をしたときでも変更箇所をここだけにできる
const pCollectionName = 'mymap';
const collectionName = 'point';

export default class MymapPointService {
    constructor(){
        this.db = firebaseApp.firestore();
    }

    create(userId, point) {
        return new Promise((resolve, reject) => {
          const firestore = firebaseApp.firestore();
          firestore.collection(pCollectionName).doc(userId).collection(collectionName).add({
            lat: point.lat,
            lng: point.lng,
            label: point.label,
            date: point.date,
            memo: point.memo,
            imageUrl: point.imageUrl,
            imageName: point.imageName,
          }).then(()=> {
            console.log('success create MymapPoint');
            resolve();
          }).catch(function (error) {
            console.error('Error adding document: ', error);
            reject();
          }); 
        });
      }
  
      searchByLabel(userId, label) {
        return new Promise((resolve, reject) => {
            const mapPoints = [];
            const posRef = this.db.collection(pCollectionName).doc(userId).collection(collectionName).where("label", "==", label);
            try {
                posRef.get().then(qs => {
                    qs.forEach(doc => {
                        let pData = doc.data();
                        const mapPoint = new MymapPoint(pData['lat'], pData['lng'], pData['label'], pData['date'], pData['memo'], pData['imageUrl'], pData['imageName']);
                        mapPoints.push(mapPoint);
                    });
                    resolve(mapPoints);
                });
            } catch (error) {
                reject();
            }
        });
      }
}