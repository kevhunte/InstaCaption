<template>
<div id="Captions" class="captions page">
  <h1 v-if="!$auth.isAuthenticated">Unauthenticated! Should not be seeing this page</h1>

  <h3>Welcome back {{$auth.user.given_name}}!</h3><br>

  <section class="">
    <h6>We'll suggest some of your recent searches:</h6>
    <!--<div id="prevWrapper" focus class="col-md-4 m-4 mx-auto">
      <div v-for="ps in this.$store.getters.previousSearchs" class="m-2">
        <strong v-b-toggle="'Song_'+ps.id" class="clickme"> {{ps.name}} by {{ps.Artist}} </strong>
        <br>
        <b-collapse :id="'Song_'+ps.id" class="mt-2">
          <h6 style="font-size:1.2rem;">{{ps.Lyrics}}</h6>
        </b-collapse>
      </div>
    </div>-->
  </section>
  <div id="form-container" class="col-md-6 mx-auto m-2">
    <b-form @reset="onReset">
      <b-form-group id="input-group-1" label="" label-for="input-1" description="The world is yours.">
        <b-form-input id="song_input" v-model="searchData.song" :state="songInputValidated" type="search" autocomplete="off" placeholder="Enter a song" :list="dataList">
        </b-form-input>

        <datalist id="my-list-id" class="col-md-6 mx-auto">
          <option v-for="ps in this.$store.getters.previousSearchs">{{ ps.name }}</option>
        </datalist>

        <b-form-input id="artist_input" class="mt-2" v-model="searchData.artist" :state="artistInputValidated" type="search" autocomplete="off" placeholder="Enter an artist" :list="dataList2">
        </b-form-input>

        <!--This may have repeats. Have to loop through and make a set-->
        <datalist id="my-list-id2" class="col-md-6 mx-auto">
          <option v-for="artist in this.uniqueArtists">{{ artist }}</option>
        </datalist>

      </b-form-group>

      <b-button type="submit" @click="onSubmit" @keyup.enter="onSubmit" variant="primary">Search</b-button>
      <b-button type="reset" v-if="searchData.song" variant="danger">Reset</b-button>
    </b-form>
  </div>

  <div id="resultsContainer" v-if="$store.getters.currentLyrics" class="col-md-8 m-4 mx-auto">
    <b-img rounded="circle" style="max-width:2.5rem;" :src="this.$store.getters.songObj.image"></b-img>
    <strong> {{this.$store.getters.songObj.name}} by {{this.$store.getters.songObj.Artist}}</strong><br>
    <strong v-for="(sr,index) in this.$store.getters.currentLyrics" :key="index">
      {{sr.content}} <br>
    </strong>
  </div>

</div>
</template>
<script>
var request = require("request");
const cheerio = require("cheerio");
export default {
  name: 'captions',
  data() {
    return {
      searchData: {
        song: null,
        album: null,
        artist: null
      },
      dataList: '',
      dataList2: '',
      songInputValidated: null,
      artistInputValidated: null,
      uniqueArtists: new Set(),
      accessToken: null
    }
  },
  watch: {
    'searchData.song': function(val) { // only shows on type
      if (val) {
        this.dataList = 'my-list-id';
      } else {
        this.dataList = '';
      }
      //return val ? this.songInputValidated = true : this.songInputValidated = false; // state validation
    },
    'searchData.artist': function(val) { // only shows on type
      if (val) {
        this.dataList2 = 'my-list-id2';
      } else {
        this.dataList2 = '';
      }
    }
  },
  async created() {

    if (typeof this.$store.getters.previousSearchs !== undefined) {
      let claims = await this.$auth.getIdTokenClaims();
      this.accessToken = claims.__raw;
      // sets from cache or from API
      this.getPreviousSearch(this.accessToken);
      this.getArtists();
    }
    //console.log('token - ', this.accessToken);
  },
  methods: {
    getPreviousSearch(token) {
      this.$store.dispatch('getPreviousSearch', token);
    },
    getArtists() {
      for (let s of this.$store.getters.previousSearchs) {
        this.uniqueArtists.add(s.Artist); // displays artists with no repeats
      }
    },
    async fetchSongData(_song, _artist, token) {
      let results = null;
      // make fetch to wrapper with song and artist as query strings
      try {
        let params = new URLSearchParams({
          artist: _artist,
          song: _song
        });
        const response = await fetch('https://uy72bfatvl.execute-api.us-east-1.amazonaws.com/dev/?' + params, {
          headers: {
            Authorization: token
          }
        });
        const data = await response.json();
        //console.log('fetchSongData - ', data.body);
        return data.body;
      } catch (e) {
        console.log('error - ', e);
      }


      return results;
    },
    updateCachedSearches(result) {
      let searches = this.$store.getters.previousSearchs;

      if (searches.length < 7) { // append and update
        searches.push(result);
        this.$store.commit('setPreviousSearches', searches);
      } else { // pop from top and push
        searches.shift();
        searches.push(result);
        this.$store.commit('setPreviousSearches', searches);
      }

      this.pullLyrics(result.url);
      this.getArtists(); // refreshes after new addition
    },
    async onSubmit(evt) {
      evt.preventDefault();
      if (!this.searchData.song) {
        // might want to add some type of regex in here too
        //console.log('Invalid search');
        this.songInputValidated = false;
        return;
      }
      if (!this.searchData.artist) {
        this.artistInputValidated = false
      }
      this.songInputValidated = null;
      this.artistInputValidated = null;
      //console.log(this.searchData.song);
      for (let p of this.$store.getters.previousSearchs) { // only seven objects max. Not that bad
        const ps = p;
        if (ps.name.includes(this.searchData.song)) { // check if toUpper works with symbols in string
          // TODO: store ps object in the store. Will be used to show song pic and artist
          this.$store.commit('setSongObj', ps);
          await this.pullLyrics(ps.url); // pulls lyrics and stores in results
          return;
        }
      }
      console.log('Making call to AWS..');
      // if we get here we have to call API to get it

      const result = await this.fetchSongData(this.searchData.song, this.searchData.artist, this.accessToken);

      this.updateCachedSearches(result);

    },
    onReset() {
      this.searchData.song = null;
      this.searchData.artist = null;
      this.searchResults = null;
      this.songInputValidated = null;
      this.artistInputValidated = null;
    },
    pullLyrics(url) {
      //let lyrics = null;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      let arr = []
      try {
        // start loading
        request(proxy + url, function(error, response, body) {
          if (error) throw new Error(error);
          //console.log('got webpage');
          //console.log(body);
          //parse body
          const $ = cheerio.load(body);
          //const lyrics = $('body > routable-page > ng-outlet > song-page > div > div > div.song_body.column_layout > div.column_layout-column_span.column_layout-column_span--primary > div > defer-compile:nth-child(1) > lyrics > div > div.lyrics');

          let rawLyrics = $('div.lyrics').text().trim();
          // split around brackets
          //console.log(rawLyrics);
          // regex to process data
          let lyrics = rawLyrics.replace(/\[(.*)\]/g, "").trim().split('\n'); // displays line by line

          for (let i = 0; i < lyrics.length; i++) {
            arr.push({
              content: lyrics[i]
            });
          }
        });
        this.$store.dispatch('setCurrentSearch', arr);
        // stop loading
        //console.log('updated - ', this.$store.getters.currentLyrics);
      } catch (e) {
        // show crashed message
        console.error(e);
      }
    },
    parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }
  }
}
</script>
<style scoped>
.clickme {
  font-size: 1.2rem;
}

.clickme:hover {
  color: #17a2b8;
  font-size: 1.22rem;
}

/*Gets rid of caret in auto-fill*/
[list]::-webkit-calendar-picker-indicator {
  display: none;
}

#resultsContainer {
  overflow-y: auto;
  max-height: 18rem;
  border-style: solid;
  border-radius: 8px;
  border-width: thin;
}

/*#prevWrapper {
  overflow-y: auto;
  height: 8rem;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  border-color: #212529;
}*/
</style>
