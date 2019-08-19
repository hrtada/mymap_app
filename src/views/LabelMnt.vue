<template>
  <div>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <p class="title is-4">ラベル設定</p>
        <div class="field">
          <label class="label">ラベル</label>
            <div class="control">
                <input type="text" v-model="addLabelName">
                <button @click="add()">追加</button>
                <ul>
                <li v-for="(item,index) in $store.state.label" :key="item.id">
                 {{ item.name}}
                <button @click="edit(index)">選択</button>
                </li>
                <input type="text" v-model="editLabelName">
                </ul>
            </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button @click="entry()" class="button is-link" >登録</button>
          </div>
          <div class="control">
            <button @click="chancel()" class="button is-link">ｷｬﾝｾﾙ</button>
          </div>
          <div class="control">
            <button @click="del()" class="button is-link">削除※使用禁止</button>
          </div>
        </div>
      </div>
    </div>
 
  </div>
</template>

<script>
/* eslint-disable no-console */
import  firebaseApp from '../firebase';
import 'bulma/css/bulma.css';//CSSフレームワーク

let db = firebaseApp.firestore()

export default {
  
  data () {
    return {
      editLabelName: null,
      editLabelId:null,
      addLabelName:null,
    }
  }, 

  computed:{
    label(){return this.$store.getters.label},//storeのgetterと同期する
  },

  mounted(){
    //ラベル情報を取得し、storeに渡す
    const labelRef = db.collection('user1').doc('option').collection('label'); 
    let label =[];
    labelRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        label.push({id:doc.id, name:data.name});
        this.$store.commit('setlabel',{label: label});
      })
    }); 
  },

  methods: {
    add(){
      let labelListS = (this.$store.state.label).map((value) => value.id)//labelのIDのみの配列作成
      let labelListN = labelListS.map((value) => Number(value))//stringの配列なのでNumberに変換
      let maxIdN = (Math.max.apply(null,labelListN))+1//labelIdの最大値+1取得
      let maxIdS = String(maxIdN)//stringに戻す
      console.log(maxIdS)
       db.collection('user1').doc('option').collection('label').doc(maxIdS).set({
        name:this.addLabelName
        }).then(() => {
        window.location.reload();
        })
    },

    edit(index){
      this.editLabelName = this.$store.state.label[index].name; 
      this.editLabelId = this.$store.state.label[index].id;
      //this.befoLabelName = this.label[index].name; //firestore保存時の検索のためにおいておく
    },

    entry(){    
      const labelRef = db.collection('user1').doc('option').collection('label').doc(this.editLabelId);
      labelRef.update({//更新する
        name: this.editLabelName
        }).then(() => {
        window.location.reload();
        })
    },

    del(){ //★未完成0819 
      //削除対象のラベルを使用したポイントデータの有無を確認
      let docId=[];
      const posRef = db.collection('user1').where('label','==',this.editLabelId);
      const labelRef = db.collection('user1').doc('option').collection('label').doc(this.editLabelId);
      posRef.get().then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
          docId.push([doc.id]);
        });
        console.log(docId)

        if(docId.length>0){//ポイント情報が存在するときはアラートを出して削除
          let result = confirm('このラベルを使用したポイント情報が存在します。\n削除してもよろしいですか。');
          if(result){
/*             const batch = db.batch();//★0819エラーが解決せず
            docId.forEach((docId)=>{
              const delPosRef = db.collection('user1').doc(docId);
              batch.delete(delPosRef);// ポイント情報削除
            }); */
            docId.forEach((docId)=>{//★0819エラーが解決せず
              const delPosRef = db.collection('user1').doc(docId);
              delPosRef.delete()
            });
            
            labelRef.delete().then(()=>{//ラベル情報削除
            window.location.reload(); 
            });
          } else{
            return
          }
        }else{              
          labelRef.delete().then(()=>{//ラベル情報削除
          window.location.reload(); 
          });
        }
      });
    },
    chancel(){
      this.$router.push({ path: "/map" });  
    }
  }
}

</script>

<style>

</style>
