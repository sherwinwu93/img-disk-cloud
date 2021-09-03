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
    }
  },
  mutations: {
    message(state, payload) {
      state.snackbar.show = true;
      state.snackbar.color = payload.color;
      state.snackbar.text = payload.text;
    }
  }
})
