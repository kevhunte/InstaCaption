<template>
<div id="Captions" class="captions page">
  <h1 v-if="!$auth.isAuthenticated">Unauthenticated! Should not be seeing this page</h1>
  <h3>Welcome back {{$auth.user.given_name}}!</h3><br><br>
  <h4>Element to show last searched from API 2, GET Req.<br>
    Check Cache then DB <br>
    Store/Send back as much as possible, paginate data</h4><br><br>
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
    return {}
  }
}
</script>
<style>
</style>
