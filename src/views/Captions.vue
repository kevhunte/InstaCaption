<template>
<div id="Captions" class="captions page">
  <h1 v-if="!$auth.isAuthenticated">Unauthenticated! Should not be seeing this page</h1>

  <h3>Welcome back {{$auth.user.given_name}}!</h3><br>

  <section class="">
    <h4>Here's what you searched for last time:</h4>
    <div id="prevWrapper" focus class="col-md-4 m-4 mx-auto">
      <div v-for="ps in this.$store.getters.previousSearchs" class="m-2">
        <strong v-b-toggle="'Song_'+ps.id" class="clickme"> {{ps.name}} by {{ps.Artist}} </strong>
        <br>
        <b-collapse :id="'Song_'+ps.id" class="mt-2">
          <h6 style="font-size:1.2rem;">{{ps.Lyrics}}</h6>
        </b-collapse>
      </div>
    </div>
  </section>
  <h4>Check Cache then DB <br>Store/Return as much as possible, paginate data
    <br></h4>
  <div id="form-container" class="col-md-6 mx-auto m-2">
    <b-form @reset="onReset">
      <b-form-group id="input-group-1" label="" label-for="input-1" description="The world is yours.">
        <b-form-input id="input-1" v-model="searchData.song" type="search" required autocomplete="off" placeholder="Enter a song" list="my-list-id">
        </b-form-input>

        <datalist id="my-list-id">
          <option v-for="ps in this.$store.getters.previousSearchs">{{ ps.name }}</option>
        </datalist>

      </b-form-group>

      <!--<b-form-group id="input-group-2" label="" label-for="input-2">
        <b-form-input id="input-2" v-model="searchData.artist" :required="!searchData.song" placeholder="Or enter an artist"></b-form-input>
      </b-form-group>-->

      <b-button type="submit" @click="onSubmit" variant="primary">Search</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
  <h5>Form component for capturing search criteria<br>^^cleanse input for xss^^</h5><br><br>
  <h5>Pass to parent to create GET request to Genius wrapper, API 1. <br>
    Security: tarpit users that make more than 15 unique requests in a day.<br>
    400 response with tarpit error message</h5><br><br>
  <h4>Populate with search results from wrapper.<br>
    Update last searched to show most recent? Design decision</h4><br><br>
</div>
</template>
<script>
export default {
  name: 'captions',
  data() {
    return {
      searchData: {
        song: null,
        album: null,
        artist: null
      },
      searchResults: null
      //accessToken: null
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
    onSubmit(evt) {
      evt.preventDefault()
    },
    onReset() {

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

/*#prevWrapper {
  overflow-y: auto;
  height: 8rem;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  border-color: #212529;
}*/
</style>
