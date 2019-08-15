<template>
  <div>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <p class="title is-4">ラベル設定</p>
        <div class="field">
          <label class="label">ラベル</label>
            <div class="control">
                <input type="text">
                <button>追加</button>
                <ul>
                <li v-for="(item,index) in label" :key="item.name">
                 {{ item.name}}
                <button @click="edit(index)">選択</button>
                <!-- <input type="checkbox">削除   -->
                </li>
                <input type="text" v-model="editLabelName">
                <!-- <button @click="editEntry()">修正</button> -->
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
            <button @click="del()" class="button is-link">削除</button>
          </div>
        </div>
      </div>
    </div>
 
  </div>
</template>

<script>
/* eslint-disable no-console */
import db from '../firestore';
import 'bulma/css/bulma.css';//CSSフレームワーク

export default {
  
  data () {
    return {
      label: null,
      editLabelIndex: null,
      editLabelName: null,
      befoLabelName: null,
      addLabel: null,
      addLabelName:null,
    }
  },    

  mounted(){
    //ラベル情報を取得し、storeに渡す
    const labelRef = db.collection('user1').doc('option').collection('label'); 
    labelRef.get().then(querySnapshot => {
    const label = querySnapshot.docs.map(doc => doc.data());
    this.$store.commit('setlabel',{label: label});

    this.label =  this.$store.state.label;
    });

    },

  methods: {
    add(){  

    },
    del(){ //地図情報もあわせて削除。メッセージボックスだす 
/*       this.label.splice(index,1);
      console.log(this.label); */
    },

    edit(index){
      //this.editLabelindex = index;
      this.editLabelName = this.label[index].name; 
      this.befoLabelName = this.label[index].name; //firestore保存時の検索のためにおいておく
    },

    entry(){//未完成
      //firestoreのlabelを更新
      const labelRef = db.collection('user1').doc('option').collection('label');
      const queryLabel = labelRef.where("name","==",this.befoLabelName)
      queryLabel.get().then((querySnapshot) => {// 変更前のラベル名からdoc.idを取得
          querySnapshot.forEach((doc) => {
            const docId = doc.id;
            labelRef.doc(docId).set({//docidを指定してラベル名を上書き
            name: this.editLabelName
            })
          })      
        });
      //未完成。地点情報について１件しか更新されない
      const queryPos = db.collection('user1').where("label","==",this.befoLabelName)//修正前の名称を使っているドキュメントを抽出
        queryPos.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docId = doc.id;//ドキュメントIDを取得
          db.collection('user1').doc(docId).update({
            label: this.editLabelName//修正後の名称で書き換える
          });
        });      
      }); 
    
        //labelRef.set({//更新する
        //   name: this.label.name
        //   }).then(() => {
        //   window.location.reload();
        //   })
        },

    chancel(){
      this.$router.push({ path: "/map" });  
    }
  }
}

</script>

<style>

</style>
