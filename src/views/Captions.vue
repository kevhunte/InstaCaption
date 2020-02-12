<template>
<div id="Captions" class="captions page">
  <h1 v-if="!$auth.isAuthenticated">Unauthenticated! Should not be seeing this page</h1>
  <h3>Welcome back {{$auth.user.given_name}}!</h3><br><br>
  <h4>Element to show last searched from API 2, GET Req.<br>
    <div>
      <h5>Here's what you searched last time you were here:</h5>
      <div :id="'Song_'+ps.id" v-for="ps in this.$store.getters.previousSearchs" class="m-2">
        <strong style="font-size:1.2rem;"> {{ps.name}} by {{ps.Artist}} </strong>
        <b-button variant="info" pill size="sm">Show me the lyrics</b-button>
        <br>
        <!--Toggle with the button-->
        <h6 style="font-size:1.2rem;">{{ps.Lyrics}}</h6>
      </div>
    </div>
    Check Cache then DB <br>
    Store/Send back as much as possible, paginate data
  </h4><br><br>
  <h5>Form component for capturing search criteria<br>^^cleanse input for xss^^</h5><br><br>
  <h5>Pass to parent to create GET request to Genius wrapper, API 1. <br>
    Security: tarpit users that make more than 15 unique requests in a day.<br>
    400 response with tarpit error message</h5><br><br>
  <h4>Populate with search results from wrapper.<br>Update last searched to show most recent? Design decision</h4><br><br>
</div>
</template>
<script>
export default {
  name: 'captions',
  data() {
    return {
      //previousSearchs: null
    }
  },
  created() {
    if (typeof this.$store.getters.previousSearchs !== undefined) {
      this.getPreviousSearch();
    }
  },
  methods: {
    getPreviousSearch() {
      this.$store.dispatch('getPreviousSearch');
    },
    showCaption(id) {
      return this.$store.getters.previousSearchs[id];
    }
  }
}
</script>
<style>
</style>
