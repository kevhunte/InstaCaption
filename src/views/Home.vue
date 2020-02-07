<template>
<div class="home">
  <!--<h1 id="Homeheader" class="">InstaCaption</h1>-->
  <!--Change font here-->
  <div id="carousel" class="row align-items-center">
    <b-carousel id="carousel-1" class="w-responsive col-md-7 mx-auto p-3 m-2" v-model="slide" :interval="this.interval" fade indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart" @sliding-end="onSlideEnd" @mouseenter="onPause" @mouseleave="onResume">
      <!-- Text slides with image -->
      <b-carousel-slide caption="Your Favorite Artists" :img-src="this.images[0]"></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide caption="And Their Lyrics" :img-src="this.images[1]"></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide caption="Caption Ready" :img-src="this.images[2]"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide caption="At An Instant" :img-src="this.images[3]"></b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Sign In And Enjoy" :img-src="this.images[4]">
      </b-carousel-slide>
      <!--.carousel-caption css class to change font color -->
    </b-carousel>
  </div>
  <h2> A blurb about the site</h2>
  <h3>Adsense div here</h3>
  <!--<img alt="Vue logo" src="../assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
</div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data() {
    return {
      sliding: null,
      slide: 0,
      interval: this.timer,
      timer: 4000,
      images: [
        require('@/assets/RoddyRicch.jpg'),
        require('@/assets/AriLennox.png'),
        require('@/assets/KungFuKenny.jpg'),
        require('@/assets/Jhene.jpg'),
        require('@/assets/DaBaby.jpg')
      ]
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    onPause(slide) {
      this.interval = 0
    },
    onResume(slide) {
      this.interval = this.timer
    }
  }
}
</script>

<style scoped>
</style>
