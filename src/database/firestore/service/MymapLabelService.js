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

/*     del(){    
        let posRef = db.collection('mymap').doc(this.$store.state.userUid).collection('point').where('label','==',this.editLabelId);
        **let labelRef = db.collection('mymap').doc(this.$store.state.userUid).collection('label').doc(this.editLabelId);
        let storageRef = firebaseApp.storage().ref();
             
        //対象データの存在チェック
        let doc_id = [];
        posRef.get().then((qs)=> {
            qs.forEach((doc)=> {
              doc_id.push([doc.id]);//削除対象データのdocIdを取得し、配列作成
            });
        }).then(() => {
  
          if(doc_id.length>0){//ポイント情報が存在するときはアラートを出して削除
              let result = confirm('このラベルを使用したポイント情報が存在します。\n削除してもよろしいですか。');
              if(result){
                posRef.get().then((qs)=> {
                  qs.forEach((doc)=> {//選択ラベルを使用したpointデータ取得
                    const delPosRef = db.collection('mymap').doc(this.$store.state.userUid).collection('point').doc(doc.id);
                    delPosRef.delete();//pointデータ削除
                    const delImageRef = storageRef.child(`images/${doc.get('imageName')}`);//画像データ取得
                    delImageRef.delete();//画像データ削除
                  });
                  **labelRef.delete();//labelデータ削除
                }).then(() => {
                  this.editLabelName ='';//入力内容のクリア
                  //ラベル情報を取得しstoreに渡す※1他でも使ってるので共通化したい
                  const labelRef = db.collection('mymap').doc(this.$store.state.userUid).collection('label');
                  let label =[];
                  labelRef.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      const data = doc.data();
                      label.push({id:doc.id, name:data.name});
                      this.$store.commit('setlabel',{label: label});
                    })
                  }); 
                });
              } else{
                return
              }
          }else{
            labelRef.delete().then(() => {
              this.editLabelName ='';//入力内容のクリア
              //ラベル情報を取得しstoreに渡す※1他でも使ってるので共通化したい
              const labelRef = db.collection('mymap').doc(this.$store.state.userUid).collection('label');
              let label =[];
              labelRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  const data = doc.data();
                  label.push({id:doc.id, name:data.name});
                  this.$store.commit('setlabel',{label: label});
                })
              }); 
            });
          }
        })
      } */















}
