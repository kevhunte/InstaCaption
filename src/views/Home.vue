<template>
<div class="home page">
  <!--<h1 id="Homeheader" class="">InstaCaption</h1>-->
  <!--Change font here-->
  <div id="carousel">
    <b-carousel id="carousel-1" class="col-md-7 mx-auto m-2" v-model="slide" :interval="this.interval" fade indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd" @mouseenter="onPause" @mouseleave="onResume">

      <b-carousel-slide caption="Your Favorite Artists" :img-src="this.$store.getters.images[0]"></b-carousel-slide>


      <b-carousel-slide caption="And Their Lyrics" :img-src="this.$store.getters.images[1]"></b-carousel-slide>


      <b-carousel-slide caption="Caption Ready" :img-src="this.$store.getters.images[2]"></b-carousel-slide>


      <b-carousel-slide caption="At An Instant" :img-src="this.$store.getters.images[3]"></b-carousel-slide>


      <b-carousel-slide caption="Sign In And Enjoy" :img-src="this.$store.getters.images[4]">
      </b-carousel-slide>

    </b-carousel>
  </div>
  <div class="col-md-7 mx-auto mt-5">
    <h6>
      If you have any unanswered questions, check out the <b @click="toAboutPage">About page</b>
      and see if that helps.
    </h6>
    <br>
    <h6>
      If you're ready to start or have already been here before, head to the <b @click="toCaptionsPage">Captions page</b>
      in order to access your favorite lyrics on any device, in any location, at any time.
    </h6>
  </div>
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
      timer: 4000
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
    },
    toCaptionsPage() {
      //console.log('toCaptionsPage: someone clicked me');
      this.$router.push('captions');
    },
    toAboutPage() {
      //console.log('toCaptionsPage: someone clicked me');
      this.$router.push('about');
    }
  }
}
</script>

<style>
#carousel-1 {
  padding: 0 0 0 0;
}
</style>
