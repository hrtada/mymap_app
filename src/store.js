import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
state:{
    label:null,
    newLat:0,
    newLng:0,
    editLat:0,
    editLng:0,
    checked:null,
    userUid:null,
    userName:null,
 },

getters:{
   newLat(state){return state.newLat},
   newLng(state){return state.newLng},
   editLat(state){return state.editLat},
   editLng(state){return state.editLng},
   label(state){return state.label},
/*    userUid(state){return state.userUid},
   userName(state){return state.userName}, */
 },

mutations:{
  setnewLat(state,payload){
         state.newLat = payload.newLat
  },
  setnewLng(state,payload){
    state.newLng = payload.newLng
  },
  seteditLat(state,payload){
    state.editLat = payload.editLat
  },
  seteditLng(state,payload){
    state.editLng = payload.editLng
  },
  setlabel(state,payload){
   state.label = payload.label
  },
  setchecked(state,payload){
    state.checked = payload.checked
   },
   setuserUid(state,payload){
    state.userUid = payload.userUid
   },
   setuserName(state,payload){
    state.userName = payload.userName
   }
},

actions:{
}

 })

export default store
