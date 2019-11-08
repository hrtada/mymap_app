<template>
  <div>
    <!-- <div class="columns">
      <div class="column is-12"> -->

          <p class="has-text-weight-bold">ラベルの追加</p>
            <div class="field is-grouped"> 
                <input class="input is-small" type="text" placeholder="ラベルを入力してください" v-model="addLabelName">
                <button class="button is-link is-small" @click="add()">追加</button>
            </div>
              
            <p class="has-text-weight-bold">ラベルの編集・削除</p>
              <div class="field is-grouped">
                <input class="input is-small" type="text" placeholder="選択したラベルを表示" v-model="editLabelName">
                <div class="control">
                  <button @click="entry()" class="button is-link is-small" >変更</button>
                </div>
                <div class="control">
                  <button @click="del()" class="button is-link is-small">削除</button>
                </div>
              </div>
                <ul>
                <li v-for="(item,index) in label" :key="item.id">
                 {{ item.name}}
                <button class="button is-small is-rounded is-outlined" @click="edit(index)">選択</button>
                </li>
                </ul>
       <!-- </div>
    </div> -->
  </div>
</template>

<script>
/* eslint-disable no-console */
//import  firebaseApp from '../firebase';
//import MymapLabelService from '../database/firestore/service/MymapLabelService'
//import MymapPointService from '../database/firestore/service/MymapPointService';
//import MymapPointServiceMysql from "../database/firestore/service/MymapPointServiceMysql";
import MymapLabelServiceMysql from "../database/firestore/service/MymapLabelserviceMysql";
import MymapPointServiceMysql from '../database/firestore/service/MymapPointServiceMysql'
import 'bulma/css/bulma.css';//CSSフレームワーク

//let db = firebaseApp.firestore()

export default {
  name: 'label-mnt',

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
    },
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
        alert('名前を入力してください');
      }else{
        //SQLiteにラベルを登録
        const mymapLabelServiceMysql = new MymapLabelServiceMysql();
        const addLabel = await mymapLabelServiceMysql.addLabel(this.addLabelName,this.$store.state.userUid);
        if(addLabel == true){
          //ラベル情報を取得し、storeに渡す
          this.getLabellist();
          //入力内容のクリア
          this.addLabelName ='';
        }else {
          alert('登録できませんでした');
        }
      //  //★20190925この処理不要かも。idは自動取得でOKなはず。見直し予定
      // let labelListS = (this.$store.state.label).map((value) => value.id)//labelのIDのみの配列作成
      // let labelListN = labelListS.map((value) => Number(value))//stringの配列なのでNumberに変換
      // let maxIdN = 0;
      // if(labelListN.length == 0){
      //   maxIdN = 1
      // }else{
      //   maxIdN = (Math.max.apply(null,labelListN))+1//labelIdの最大値+1取得
      // }
      // let maxIdS = String(maxIdN)//stringに戻す 

      // const mymapLabelService = new MymapLabelService();
      // const resultUpdate = await mymapLabelService.addLabel(this.$store.state.userUid,maxIdS,this.addLabelName);

        // if(resultUpdate == 'true'){
        //   //ラベル情報を取得し、storeに渡す
        //   const label = mymapLabelService.getLabel(this.$store.state.userUid);
        //   this.$store.commit('setlabel',{label: label});
        //   //入力内容のクリア
        //   this.addLabelName ='';
        // }else {
        //   alert('登録できませんでした');
        // }

      }
    },

    edit(index){//選択ボタンを押したときの動作
      this.editLabelName = this.label[index].name;
      this.editLabelId =this.label[index].id; 
    },

    async entry(){
      if(this.editLabelName == ''){//空欄の時は何もしない
        alert('名前を入力してください');
      }else{
        //SQLiteにラベルを登録
        const mymapLabelServiceMysql = new MymapLabelServiceMysql();
        const updateLabel = await mymapLabelServiceMysql.updateLabel(this.editLabelId,this.editLabelName);
        if(updateLabel == true){
          //ラベル情報を取得し、storeに渡す
          this.getLabellist();
          //入力内容のクリア
          this.editLabelName ='';
        }else {
          alert('登録できませんでした');
        }
      }
        // const mymapLabelService = new MymapLabelService();
        // const update = await mymapLabelService.updateLabel(this.$store.state.userUid,this.editLabelId,this.editLabelName);

        // if(update == 'true'){
        //   //ラベル情報を取得し、storeに渡す
        //   const label = mymapLabelService.getLabel(this.$store.state.userUid);
        //   this.$store.commit('setlabel',{label: label});
        //   //入力内容のクリア
        //   this.editLabelName ='';
        // }else {
        //   alert('登録できませんでした');
        // }     
    },

    async del(){
      const mymapLabelServiceMysql = new MymapLabelServiceMysql();
      const mymapPointServiceMysql = new MymapPointServiceMysql();
      //対象のlabelIdを渡す
      await mymapLabelServiceMysql.getdelLabel(this.editLabelId);
      //labelを使用したpointを受け取る
      const delMapPoint = await mymapLabelServiceMysql.searchByDelLabel();
      
      if(delMapPoint.length > 0){
        let answer = confirm('このラベルを使用したポイントが存在します。\n削除してもよろしいですか。');
        if(answer){
          let result = await mymapLabelServiceMysql.deleteLabel();
          if(result == true){
            //ラベル情報を再取得
            this.getLabellist();
            //入力内容のクリア
            this.editLabelName ='';
            //画像の削除
            for(let i=0; i<delMapPoint.length; i++){
              if(delMapPoint[i].imageName !=''){
              mymapPointServiceMysql.deleteImage(delMapPoint[i].userId,delMapPoint[i].imageName);
              }
            }
          }
        } 
      } else {
        let result = await mymapLabelServiceMysql.deleteLabel();
        if(result == true){
          //ラベル情報を再取得
          this.getLabellist();
          //入力内容のクリア
          this.editLabelName ='';
        }
      }

      // let result = confirm('このラベルを使用したポイント情報が存在します。\n実行してもよろしいですか。');
      // //削除ラベルを使ったポイントを探して削除
      // if(result){
      //   const deleteLabel = await mymapLabelServiceMysql.deleteLabel(this.editLabelId);
      //   const delMapPoint = await mymapLabelServiceMysql.searchByDelLabel();//削除対象のポイントデータ受取
      //   if(deleteLabel == true){
      //     //ラベル情報を再取得
      //     this.getLabellist();
      //     //入力内容のクリア
      //     this.editLabelName ='';
      //   } else {
      //     alert('削除できませんでした');
      //   }
      // }


      // const mymapLabelService = new MymapLabelService();
      // const mymapPointService = new MymapPointService();
      // //削除ラベルを使ったポイントを探して削除
      // const resultdelete = await mymapPointService.dellPoint(this.$store.state.userUid,this.editLabelId);

      // if(resultdelete == 'true'){
      //   //ラベルの削除
      //   await mymapLabelService.dellLabel(this.$store.state.userUid,this.editLabelId);
      //   //ラベル情報を取得し、storeに渡す
      //   const label = mymapLabelService.getLabel(this.$store.state.userUid);
      //   this.$store.commit('setlabel',{label: label});
      //   //入力内容のクリア
      //   this.editLabelName ='';
      // }

    },

    chancel(){
      this.$router.push({ path: "/map" });  
    }
  }
}
</script>

<style>

</style>
