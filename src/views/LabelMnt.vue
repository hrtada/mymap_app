<template>
  <div>
    <div class="hero is-primary">
      <div class="hero-header">
        <div class="field is-grouped">
          <label @click="chancel()">前画面へ戻る</label>
          </div>
      </div> 
    </div>     
    <div class="columns">
      <div class="column is-5 is-offset-4">
        <p class="title is-4">ラベルの設定</p>

          <label class="label">ラベルの追加</label>
            <div class="field is-grouped"> 
                <input class="input" type="text" placeholder="ラベル名を入力してください" v-model="addLabelName">
                <button class="button is-link" @click="add()">追加</button>
            </div>
              
            <label class="label">ラベルの編集・削除</label>
              <div class="field is-grouped">
                <input class="input" type="text" placeholder="選択したラベル名を表示します" v-model="editLabelName">
                <div class="control">
                  <button @click="entry()" class="button is-link" >変更</button>
                </div>
                <div class="control">
                  <button @click="del()" class="button is-link">削除</button>
                </div>
              </div>
                <ul>
                <li v-for="(item,index) in label" :key="item.id">
                 {{ item.name}}
                <button class="button is-small is-rounded is-outlined" @click="edit(index)">選択</button>
                </li>
                </ul>


       </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable no-console */
//import  firebaseApp from '../firebase';
import MymapLabelService from '../database/firestore/service/MymapLabelService'
import MymapPointService from '../database/firestore/service/MymapPointService';
import MymapPointServiceMysql from "../database/firestore/service/MymapPointServiceMysql";
import MymapLabelServiceMysql from "../database/firestore/service/MymapLabelserviceMysql";
import 'bulma/css/bulma.css';//CSSフレームワーク

//let db = firebaseApp.firestore()

export default {
  
  data () {
    return {
      editLabelName:'',
      editLabelId:'',
      addLabelName:'',
    }
  }, 

  computed:{
    label() {
      return this.$store.getters.label;
    },//storeのgetterと同期する
  },

  mounted(){
    //ラベル情報を取得し、storeに渡す(MySQL)
    this.getLabellist();

    //ラベル情報を取得しstoreに渡す
      // const mymapLabelService = new MymapLabelService();
      // const label = mymapLabelService.getLabel(this.$store.state.userUid);
      // this.$store.commit('setlabel',{label: label});

  },

  methods: {
    //ラベル情報を取得し、storeに渡す(MySQL)
      async getLabellist(){
        const mymapLabelServiceMysql = new MymapLabelServiceMysql();
        const label = await mymapLabelServiceMysql.getLabel();
        this.$store.commit("setlabel", { label: label });
        console.log(label);
      },

    async add(){
      if(this.addLabelName==''){//空欄の時は何もしない
        return
      }else{
      //★20190925この処理不要かも。idは自動取得でOKなはず。見直し予定
      let labelListS = (this.$store.state.label).map((value) => value.id)//labelのIDのみの配列作成
      let labelListN = labelListS.map((value) => Number(value))//stringの配列なのでNumberに変換
      let maxIdN = 0;
      if(labelListN.length == 0){
        maxIdN = 1
      }else{
        maxIdN = (Math.max.apply(null,labelListN))+1//labelIdの最大値+1取得
      }
      let maxIdS = String(maxIdN)//stringに戻す

      //firestoreにラベルを登録
      const mymapLabelService = new MymapLabelService();
      const resultUpdate = await mymapLabelService.addLabel(this.$store.state.userUid,maxIdS,this.addLabelName);

        if(resultUpdate == 'true'){
          //ラベル情報を取得し、storeに渡す
          const label = mymapLabelService.getLabel(this.$store.state.userUid);
          this.$store.commit('setlabel',{label: label});
          //入力内容のクリア
          this.addLabelName ='';
        }else {
          alert('登録できませんでした');
        }


      //firestoreにラベルを登録
/*        db.collection('mymap').doc(this.$store.state.userUid).collection('label').doc(maxIdS).set({
        name:this.addLabelName
        }).then(() => {
          this.addLabelName ='';//入力内容のクリア
          //ラベル情報を取得し、storeに渡す
          const labelRef = db.collection('mymap').doc(this.$store.state.userUid).collection('label');
          let label =[];
          labelRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              label.push({id:doc.id, name:data.name});
              this.$store.commit('setlabel',{label: label});
            })
          }); 
        }); */
      }
    },

    edit(index){//選択ボタンを押したとき
      this.editLabelName = this.label[index].name;
      this.editLabelId =this.label[index].id; 
    },

    async entry(){
        const mymapLabelService = new MymapLabelService();
        const update = await mymapLabelService.updateLabel(this.$store.state.userUid,this.editLabelId,this.editLabelName);

        if(update == 'true'){
          //ラベル情報を取得し、storeに渡す
          const label = mymapLabelService.getLabel(this.$store.state.userUid);
          this.$store.commit('setlabel',{label: label});
          //入力内容のクリア
          this.editLabelName ='';
        }else {
          alert('登録できませんでした');
        }
      
/*       const labelRef = db.collection('mymap').doc(this.$store.state.userUid).collection('label').doc(this.editLabelId);
      labelRef.update({//更新する
        name: this.editLabelName
        }).then(() => {
          this.editLabelName ='';//入力内容のクリア
          //ラベル情報を取得し、storeに渡す
          const labelRef = db.collection('mymap').doc(this.$store.state.userUid).collection('label');
          let label =[];
          labelRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              label.push({id:doc.id, name:data.name});
              this.$store.commit('setlabel',{label: label});
            })
          }); 
        }) */
    },

    async del(){
      const mymapLabelService = new MymapLabelService();
      const mymapPointService = new MymapPointService();
      //削除ラベルを使ったポイントを探して削除
      const resultdelete = await mymapPointService.dellPoint(this.$store.state.userUid,this.editLabelId);

      if(resultdelete == 'true'){
        //ラベルの削除
        await mymapLabelService.dellLabel(this.$store.state.userUid,this.editLabelId);
        //ラベル情報を取得し、storeに渡す
        const label = mymapLabelService.getLabel(this.$store.state.userUid);
        this.$store.commit('setlabel',{label: label});
        //入力内容のクリア
        this.editLabelName ='';
      }

/*     del(){    
      let posRef = db.collection('mymap').doc(this.$store.state.userUid).collection('point').where('label','==',this.editLabelId);
      let labelRef = db.collection('mymap').doc(this.$store.state.userUid).collection('label').doc(this.editLabelId);
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
                labelRef.delete();//labelデータ削除
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
    }, */
    },

    chancel(){
      this.$router.push({ path: "/map" });  
    }
  }
}
</script>

<style>

</style>
