<template>
<div id="Captions" class="captions page">
  <h1 v-if="!$auth.isAuthenticated">Unauthenticated! Should not be seeing this page</h1>

  <h3>Welcome back {{$auth.user.given_name}}!</h3><br>

  <section class="">
    <h6>We'll try to match what you searched for last time:</h6>
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
        <b-form-input id="song_input" v-model="searchData.song" type="search" required autocomplete="off" placeholder="Enter a song" :list="dataList">
        </b-form-input>

        <datalist id="my-list-id">
          <option v-for="ps in this.$store.getters.previousSearchs">{{ ps.name }}</option>
        </datalist>

      </b-form-group>

      <b-button type="submit" @click="onSubmit" @keyup.enter="onSubmit" variant="primary">Search</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>

  <div class="m-4 mx-auto">
    <strong v-for="sr in this.searchResults">{{sr}}</strong>
  </div>

  <h4>Populate with search results from wrapper.<br>
    Update last searched to show most recent! Alayna has spoken :) </h4><br><br>
  <h4>Check Dynamodb. STORE Full Title(song by artist), and URL. Key is hash('full_title'.toUpper()) -> Genius key <br><br>API is only needed for URL. Web scraping is done locally (Cheerio and Node)<br></h4>
  <h5>One API needed. Song and Artist, and site URL to them <br>
    Security: tarpit users that make more than 10 unique requests in a day.<br>
    Make terms and conditions in footer<br>
    400 response with error message</h5><br><br>
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
      searchResults: null,
      dataList: ''
      //accessToken: null
    }
  },
  watch: {
    'searchData.song': function(val) { // only shows on type
      if (val) {
        this.dataList = 'my-list-id';
      } else {
        this.dataList = '';
      }
    }
  },
  async created() {
    if (typeof this.$store.getters.previousSearchs !== undefined) {
      //doesn't work. Make dispatch store in localStorage
      this.getPreviousSearch();
    }
    //const claims = await this.$auth.getIdTokenClaims();
    //this.accessToken = claims.__raw; //bearer token for auth header
    //console.log(this.parseJwt(this.accessToken));
  },
  methods: {
    getPreviousSearch() {
      this.$store.dispatch('getPreviousSearch');
    },
    async onSubmit(evt) {
      evt.preventDefault();
      console.log("searching...");
      //console.log(this.searchData.song);
      // check if searched something already stored locally and display. If not, query wrapper
      for (let p in this.$store.getters.previousSearchs) { // only five objects max. Not that bad
        const ps = this.$store.getters.previousSearchs[p];
        //console.log(ps.name);
        if (ps.name == this.searchData.song) { // check if toUpper works with symbols in string
          await this.pullLyrics(ps.url); // pulls lyrics and stores in results
          return;
        }
      }
      console.log('Not found. Making call..');
      // if we get here we have to call API to get it

      // pull lyrics on result

      //display result and add to enqueue (inc from last id). Dequeue beginning of list
    },
    onReset() {
      this.searchData.song = null;
      this.searchResults = null;
    },
    pullLyrics(url) {
      //let lyrics = null;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      try {
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

          this.searchResults = lyrics;
          console.log('updated - ', this.searchResults);
        });
      } catch (e) {
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

/*#prevWrapper {
  overflow-y: auto;
  height: 8rem;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  border-color: #212529;
}*/
</style>
