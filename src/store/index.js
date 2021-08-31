import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: false,
    snackbar_timeout: 3000,
    snackbar_color: "",
    snackbar_text: "",
  },
  mutations: {
    message(state, payload) {
      state.snackbar = true;
      state.snackbar_color = payload.color;
      state.snackbar_text = payload.text;
    }
  }
})
