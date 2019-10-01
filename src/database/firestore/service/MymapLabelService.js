/* eslint-disable no-console */

import  firebaseApp from '../../../firebase';
// 定数を使えばfirestore側のデータ移行をしたときでも変更箇所をここだけにできる
const pCollectionName = 'mymap';
const collectionName = 'label';


export default class MymapLabelService {
    constructor(){
        this.db = firebaseApp.firestore();
    }
    //ラベルの取得
    getLabel(userId){
        const mapLabels = [];
        const labelRef = this.db.collection(pCollectionName).doc(userId).collection(collectionName)
            try {
                labelRef.get().then(qs => {
                    qs.forEach(doc => {
                        let data = doc.data();
                        mapLabels.push({id:doc.id, name:data.name});
                    });
                    //console.log(mapLabels);
                });
                return(mapLabels);        
            } catch(error){
            console.log('get label error')
            }
    }

    //ラベルの更新
    updateLabel(userId,id,labelName){
        return new Promise((resolve, reject) => {
            try{
                const labelRef = this.db.collection(pCollectionName).doc(userId).collection(collectionName).doc(id);
                labelRef.update({
                    name : labelName
                });
                resolve('true');
            }catch(error){
                console.log('update label error',error);
                reject();
            }    
        })
    }

    //ラベルの追加
    addLabel(userId,id,labelName){
        return new Promise((resolve, reject) => {
            try{
                const labelRef = this.db.collection(pCollectionName).doc(userId).collection(collectionName).doc(id);
                labelRef.set({
                    name : labelName
                });
                resolve('true');
            }catch(error){
                console.log('add label error',error);
                reject();
            }    
        })
    }
    
    //ラベルの削除
    dellLabel(userId,id){
        const labelRef =  this.db.collection(pCollectionName).doc(userId).collection(collectionName).doc(id);
        labelRef.delete();

    }
















}
