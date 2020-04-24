<template>
<div class="about page">
  <!--<h3>About the Creator</h3>-->
  <div id="content" class="">

    <div id="profileContainer" class="col-md-8 mx-auto mt-3">
      <h6 class="text-left">
        <img class="rounded-circle" style="max-width:2rem;" :src="this.profilePic"></img>
        Kevin
        <a href="https://www.linkedin.com/in/kevin-hunte-818759115/" target="_blank">
          <img style="max-width:2.5rem;" :src="this.LinkedIn"></img>
        </a>
      </h6>
    </div>
    <h6 class="col-md-8 mx-auto m-3">
      <h5>What InstaCaption does and how to use it.</h5>
      <div class="m-3">
        InstaCaption is a site made for users to seemlessly get the lyrics to their favorite songs.
        This done with a sleek, minimal UI that gets straight to the point.
      </div>
      <div>
        InstaCaption works by having each person sign in with their Google account. If you do not have a Google account, you can make a new login with us.
        InstaCaption gives you your lyrics on any device. It updates in real time with the lyrics you want.
      </div>
    </h6>
    <h6 class="col-md-10 mx-auto m-3">
      <br>
      <h5>Other projects worth checking out</h5>
      <div id="projectsContainer">
        <b-card id="card" v-if="counter === index" v-for="(ps,index) in this.$store.getters.projects" :key="ps.id" :title="ps.Text" class="col-md-5 mb-2 mx-auto animated fadeIn">
          <b-card-text>
            {{ps.Blurb}}
          </b-card-text>
          <a class="link" :href="ps.URL" target="_blank" rel="noopener">
            View repository
          </a>
        </b-card>
        <b-progress v-if="this.$store.getters.projects.length" class="w-50 mx-auto m-2" :value="counter" :max="this.$store.getters.projects.length - 1"></b-progress>
        <b-button @click="incCounter" variant="primary">Next</b-button>
      </div>
    </h6>
    <h6 class="col-md-8 mx-auto m-3">
      <br>
      <div class="m-3">
        Currently, we only keep track of the <b><i>last seven songs</i></b> you have searched for. We do this for your convenience.
        If you're new and this doesn't seem fully clear, it will once you sign in. This can be done by selecting the Captions tab in the navigation bar above.
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
      LinkedIn: require('@/assets/LinkedIn.png'),
      counter: 0
    }
  },
  created() {
    //console.log('environment is...', process.env.NODE_ENV);
    try {
      this.$store.dispatch('getProjects'); // get github projects
    } catch (e) {
      //console.log(e);
    }
  },
  methods: {
    incCounter() {
      try {
        let val = (this.counter + 1) % this.$store.getters.projects.length;
        //console.log('counter\'s new val - ', val);
        this.counter = val;
      } catch (e) {
        //console.log('error on incCounter:', e);
      }
    }
  }
}
</script>

<style scoped>
#card {
  animation-duration: 1.2s;
}

.link:hover {
  text-decoration: none;
}
</style>
