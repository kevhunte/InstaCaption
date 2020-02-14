<template>
<div id="Captions" class="captions page">
  <h1 v-if="!$auth.isAuthenticated">Unauthenticated! Should not be seeing this page</h1>

  <h3>Welcome back {{$auth.user.given_name}}!</h3><br>

  <section class="">
    <h4>Here's what you searched for last time:</h4>
    <div id="prevWrapper" focus class="col-md-4 m-4 mx-auto">
      <div v-for="ps in this.$store.getters.previousSearchs" class="m-2">
        <strong v-b-toggle="'Song_'+ps.id" class="clickme" style="font-size:1.2rem;"> {{ps.name}} by {{ps.Artist}} </strong>
        <br>
        <b-collapse :id="'Song_'+ps.id" class="mt-2">
          <h6 style="font-size:1.2rem;">{{ps.Lyrics}}</h6>
        </b-collapse>
      </div>
    </div>
  </section>
  <h4>Check Cache then DB <br>Store/Return as much as possible, paginate data
    <br><br></h4>
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
      //previousSearchs: null
    }
  },
  created() {
    if (typeof this.$store.getters.previousSearchs !== undefined) {
      //doesn't work. Make dispatch store in localStorage
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
<style scoped>
.clickme:hover {
  color: #17a2b8;
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
