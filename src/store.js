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
 },

getters:{
   newLat(state){return state.newLat},
   newLng(state){return state.newLng},
   editLat(state){return state.editLat},
   editLng(state){return state.editLng},
   label(state){return state.label},

 },

mutations:{
  setNewLat(state,payload){
         state.newLat = payload.newLat
  },
  setNewLng(state,payload){
    state.newLng = payload.newLng
  },
  setEditLat(state,payload){
    state.editLat = payload.editLat
  },
  setEditLng(state,payload){
    state.editLng = payload.editLng
  },
  setLabel(state,payload){
   state.label = payload.label
  },
  setChecked(state,payload){
    state.checked = payload.checked
   }
},

actions:{
}

 })

export default store
