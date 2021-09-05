import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      timeout: 3000,
      color: "",
      text: ""
    },
    user:{},
    folders:[],
    token:null
  },
  mutations: {
    message(state, payload) {
      state.snackbar.show = true;
      state.snackbar.color = payload.color;
      state.snackbar.text = payload.text;
    },
    login(state, payload) {
      state.user = payload.user;
      state.folders = payload.folders;
      state.token = payload.token;
    }
  }
})
