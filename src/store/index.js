import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    previousSearchs: null,
    currentLyrics: null,
    songObj: null,
    images: [
      require('@/assets/RoddyRicch.jpg'),
      require('@/assets/AriLennox.png'),
      require('@/assets/KungFuKenny.jpg'),
      require('@/assets/Jhene.jpg'),
      require('@/assets/DaBaby.jpg')
    ]
  },
  mutations: {
    setPreviousSearches(state, value){
      state.previousSearchs = value;
      if(value == null){
        localStorage.removeItem('previousSearchs');
      }
      localStorage.setItem('previousSearchs',JSON.stringify(value));
    },
    setCurrentLyrics(state, value){
      state.currentLyrics = value;
    },
    setSongObj(state, value){
      state.songObj = value;
    }
  },
  actions: {
    async getPreviousSearch(context, token){
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

        const response = await fetch('https://onifxs3yxf.execute-api.us-east-1.amazonaws.com/dev/',{
          headers:{
            Authorization: token
          }
        });
        /*
        This api call is complete. All info is in token
        */
        const data = await response.json();
        //console.log(data.body);
        console.log(data);
        if(data.statusCode == 200){
          context.commit('setPreviousSearches',data.body); // set global value
        }else{
          console.error(data);
        }

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
    currentLyrics: state => state.currentLyrics,
    songObj: state => state.songObj,
    images: state => state.images
  }
})
