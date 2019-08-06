import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
 state:{
    tag: [],
    createPos:[],
    editPos:[],
 },

 getters:{
    createPos(state){return state.createPos}
 },

 mutations:{
     setPos(state,payload){
         state.createPos = payload.createPos
     }
 },

 actions:{
     doUpdate({commit},createPos){
         commit('setPos',{createPos})
     }
 }

 })

export default store


/*サンプル↓↓
/* const store = new Vuex.Store({

  //state:コンポーネントでいうdata
  state: {
    message: 'テストstoreメッセージ'
  },

  //getters:コンポーネントでいうcomputed的なもの
  getters:{
    //messageを使用するgetter
    message(state) {
      return state.message
    }
  },

  //mutations:コンポーネントでいうmethod（と言うかsetter）
  //stateを唯一変更できるもの
  mutations: {
    //vuexでは引数をpayloadと呼ぶっぽい
    //payloadはオブジェクトにするべき（いっぱい入れれるし）
    setMessage(state,payload){
      state.message = payload.message
    }
  },

  //actionのコミットを使うことでミューテーションを呼び出す（コンポーネントには無い概念）
  actions: {
    doUpdate({commit}, message){
      commit('setMessage',{message})
    }
  }
}) 
サンプル↑↑*/

