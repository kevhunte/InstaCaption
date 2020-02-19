import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    previousSearchs: null,
    currentLyrics: null
  },
  mutations: {
    setPreviousSearches(state, value){
      state.previousSearchs = value
    },
    setCurrentLyrics(state, value){
      state.currentLyrics = value
    }
  },
  actions: {
    async getPreviousSearch(context){
      // if there, return. Else, get from server
      if(localStorage.getItem('previousSearchs')){
        try{
          context.commit('setPreviousSearches',JSON.parse(localStorage.getItem('previousSearchs')));
        }
        catch(e){
          localStorage.removeItem('previousSearchs');
        }
      }
      else{
        console.log('fetching previous searches..');
        const address = window.location.origin + '' + window.location.pathname;
        //console.log("path returned:", address);
        const response = await fetch(address + 'dummy.json'); //replace with API call to Gateway
        /*
        //pass in bearer token as auth header
        const claims = await this.$auth.getIdTokenClaims();
        const accessToken = claims.__raw; //bearer token for auth header
        //Prod Version
        const address = 'REST_API'+&userIDandProvider;
        const response = await fetch(address,{

      });
        */
        const data = await response.json();
        //console.log(data);
        context.commit('setPreviousSearches',data); // set global value
        localStorage.setItem('previousSearchs',JSON.stringify(data));
      }
    },
    saveAndClearPreviousSearch(context){
      console.log('clearing previous searches');
      //call on logout or timeout to save latest changes
      try{
        // send to server, then delete local copy. Make method async
        localStorage.removeItem('previousSearchs');
        context.commit('setPreviousSearches',null);
      }
      catch(e){
        console.log('error when deleting previous searches...\n'+e);
      }
    },
    setCurrentSearch(context, value){
      console.log('storing current search..');
      context.commit('setCurrentLyrics',value); // sets
    }
  },
  getters: {
    previousSearchs: state => state.previousSearchs,
    currentLyrics: state => state.currentLyrics
  }
})
