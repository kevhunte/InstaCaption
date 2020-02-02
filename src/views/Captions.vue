<template>
<div id="Captions">
  <a>All personal and customized data! Needs to be authenticated before seeing this page</a>
  <h3>Welcome back {{$auth.user.given_name}}</h3>
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
