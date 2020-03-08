<template>
<div class="about page">
  <!--<h3>About the Creator</h3>-->
  <div id="content" class="">
    <h6 class="fl">
      <b-img rounded="circle" style="max-width:2rem;" :src="this.profilePic"></b-img>
      Kevin
      <a href="https://www.linkedin.com/in/kevin-hunte-818759115/" target="_blank">
        <b-img style="max-width:2.5rem;" :src="this.LinkedIn"></b-img>
      </a>
    </h6>
    <h6 class="col-md-8 mx-auto m-3">
      <h5>What InstaCaption does and how to use it.</h5>
      <div class="m-3">
        InstaCaption is a site made for users to seemlessly get the lyrics to their favorite songs.
        This done with a sleek, minimal UI that gets straight to the point.
      </div>
      <div>
        InstaCaption works by having each person sign in either with their Facebook or Google account. If you have neither, you can make a new login with us.
        InstaCaption gives you your lyrics on any device. It updates in real time with the lyrics you want.
      </div>
    </h6>
    <h6 class="col-md-10 mx-auto m-3">
      <br>
      <h5>Other projects worth checking out (Use your API. Add to $store to save call)</h5><br>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </h6>
    <h6 class="col-md-8 mx-auto m-3">
      <br>
      <div class="m-3">
        Currently, we only keep track of the <b><i>last seven songs</i></b> you have searched for. We do this for your convenience.
        If you're new and that doesn't make sense, it will once you sign in. This can be done by selecting the Captions tab in the header above.
      </div>
      <div>
        In order to help us find the right song you are looking for, try your best to spell the song and artist correctly.
        We can handle some mistakes, but we're not perfect.
      </div>
    </h6>

  </div>
</div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      profilePic: require('@/assets/Kev.jpg'),
      LinkedIn: require('@/assets/LinkedIn.png')
    }
  }
}
</script>

<style scoped>
</style>
