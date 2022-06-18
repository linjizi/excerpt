import Vue from 'vue'
import Vuex from 'vuex'
// 引入trueloveStore
import trueloveStore from "./truelove";
// 引入extractStore
import extractStore from "./extract";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    trueloveStore,
    extractStore
  }
})
