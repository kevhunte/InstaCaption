import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    profile: null,
    token : null
  },
  mutations: {
    updateAuth(state, value){
      console.log("updating auth state - "+value);
      state.isAuthenticated = value
    },
    setProfile(state, data){
      console.log("updating profile - "+data);
      state.profile = data
    },
    setToken(state, value){
      state.token = value
    }
  },
  actions: {
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    getProfile: state => state.profile,
    token: state => state.token
  }
})
