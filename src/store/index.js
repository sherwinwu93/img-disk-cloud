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
    folders:['xxx', 'yyy'],
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
    },
    updateFolder(state, payload) {
      state.folders.push(payload);
    },
    quit(state, payload) {
      state.user = null;
      state.token = null;
    },
    deleteFolder(state, payload) {
      state.folders.splice(state.folders.indexOf(payload), 1);
    },
    changeQuestion(state, payload) {
      state.user.user_question = payload.question;
      state.user.user_answer = payload.answer;
    },
    changePassword(state, payload) {
      state.user.user_password = payload;
    },
    changeAvatar(state, payload) {
      state.user.user_avatar = payload;
    }
  }
})
