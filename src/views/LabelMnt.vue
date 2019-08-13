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
                <li v-for="item in label" :key="item.index">
                 {{ item.name }}
                <button @click="edit()">編集</button>
                <button @click="del()">削除</button>              
                </li>
                <input type="text">
                <button>修正</button>
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

    }
  },
  created() {
    //console.log(this.$store.state.label);     
  },

  mounted(){
    //ラベル情報を取得し、storeに渡す
    const labelRef = db.collection('user1').doc('option').collection('label'); 
    labelRef.get().then(querySnapshot => {
    const label = querySnapshot.docs.map(doc => doc.data());
    this.$store.commit('setLabel',{label: label});

    this.label =  this.$store.state.label   
    });

    },

  methods: {
    add(){  

    },
    del(){  

    },

    edit(){

    },
    chancel(){
      this.$router.push({ path: "/map" });  
    },
    entry(){
        const labelRef = db.collection('user1').doc('option').collection('label');
        labelRef.set({//更新する
          name: this.label,

      }).then(() => {
      window.location.reload();
      })
    }
  }
}

</script>

<style>

</style>
