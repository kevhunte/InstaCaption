<template>
<div class="callback">Callback</div>
</template>

<script>
export default {
  name: 'callback',
  created() {
    this.$auth.handleAuthentication().then((data) => {
      console.log("data");
      console.log(data);
      this.$router.push({
        name: 'home'
      })
    })
  }
}
</script>
