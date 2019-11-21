import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"; //リロード時に値を保持する

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    label: null,
    lat: 0,
    lng: 0,
    checked: null,
    userUid: null,
    userName: null
  },

  getters: {
    lat(state) {
      return state.lat;
    },
    lng(state) {
      return state.lng;
    },
    label(state) {
      return state.label;
    }
  },

  mutations: {
    setlat(state, payload) {
      state.lat = payload.lat;
    },
    setlng(state, payload) {
      state.lng = payload.lng;
    },
    setlabel(state, payload) {
      state.label = payload.label;
    },
    setchecked(state, payload) {
      state.checked = payload.checked;
    },
    setuserUid(state, payload) {
      state.userUid = payload.userUid;
    },
    setuserName(state, payload) {
      state.userName = payload.userName;
    }
  },

  actions: {},

  plugins: [createPersistedState({ storage: window.sessionStorage })] //リロード時に値を保持する
});

export default store;
