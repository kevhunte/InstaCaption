import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    previousSearchs: null
  },
  mutations: {
    setPreviousSearches(state, value){
      state.previousSearchs = value
    }
  },
  actions: {
    async getPreviousSearch(context){
      console.log('fetching previous searches..');
      //where the fetch will be. Dummy data is stored on web server
      const address = window.location.origin + '' + window.location.pathname;
      //console.log("path returned:", address);
      const response = await fetch(address + 'dummy.json'); //replace with API call to Gateway
      /*
      //pass in bearer token as auth header
      //Prod Version
      const address = 'REST_API'+&userIDandProvider;
      const response = await fetch(address);
      */
      const data = await response.json();
      //console.log(data);
      context.commit('setPreviousSearches',data); // set global value
    }
  },
  getters: {
    previousSearchs: state => state.previousSearchs
  }
})
