<template>
<div class="home page">
  <!--<h1 id="Homeheader" class="">InstaCaption</h1>-->
  <!--Change font here-->
  <div id="carousel">
    <b-carousel id="carousel-1" class="col-md-7 mx-auto m-2" v-model="slide" :interval="this.interval" fade indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd" @mouseenter="onPause" @mouseleave="onResume">

      <b-carousel-slide caption="Your Favorite Artists" :img-src="this.images[0]"></b-carousel-slide>


      <b-carousel-slide caption="And Their Lyrics" :img-src="this.images[1]"></b-carousel-slide>


      <b-carousel-slide caption="Caption Ready" :img-src="this.images[2]"></b-carousel-slide>


      <b-carousel-slide caption="At An Instant" :img-src="this.images[3]"></b-carousel-slide>


      <b-carousel-slide caption="Sign In And Enjoy" :img-src="this.images[4]">
      </b-carousel-slide>

    </b-carousel>
  </div>
  <h3>Adsense div here</h3>
  <div class="col-md-10 mx-auto">
    <h6> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
      aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </h6>
  </div>
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

<style>
#carousel-1 {
  padding: 0 0 0 0;
}
</style>
