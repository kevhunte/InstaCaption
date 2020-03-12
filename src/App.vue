<template>
<div id="app">
  <!--<div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>-->
  <div id="nav">
    <b-navbar id="navbar" type="dark" variant="dark" class="fixed-top">
      <b-navbar-brand to="/">InstaCaption</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/about">About</b-nav-item>
          <!--Put a nav guard on this route when it is created-->
          <b-nav-item to="/captions">Captions<b-icon-lock v-if="!this.$auth.isAuthenticated"></b-icon-lock>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <!--<em>Login</em>-->
              <h5>
                <img v-if="$auth.isAuthenticated" class="rounded-circle" style="max-width:2rem;" :src="$auth.user.picture"></img>
                <!--<a v-if="$auth.isAuthenticated" style="font-size:1rem;"> {{$auth.user.given_name}} </a>-->
                <b-icon-list></b-icon-list>
              </h5>
            </template>
            <b-dropdown-item v-if="!this.$auth.isAuthenticated" @click.prevent="login">Login</b-dropdown-item>
            <b-dropdown-item v-if="this.$auth.isAuthenticated" @click.prevent="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <!--<transition name="router-anim">-->
  <router-view id="router-view" class="animated fadeIn" />
  <!--</transition>-->
  <h6 id="footer">
    <div class="mt-4 mb-5">
      Foul play is grounds for suspension from InstaCaption. <br><br> For more information, contact the creator.
    </div>
  </h6>
</div>
</template>

<script>
import {
  BIconList,
  BIconLock
} from 'bootstrap-vue/src/icons'

export default {
  name: 'app',
  data() {
    return {}
  },
  watch: {
    '$auth.isAuthenticated': function(val) {
      if (!val) { // calls on timeout or logout
        this.$store.dispatch('saveAndClearPreviousSearch');
      }
    }
  },
  components: {
    BIconList,
    BIconLock
  },
  created() {
    if (!this.$auth.isAuthenticated) {
      // security
      this.$store.dispatch('saveAndClearPreviousSearch');
    }
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
      console.log("Signed In");
    },
    logout() {
      this.$store.dispatch('saveAndClearPreviousSearch');
      this.$auth.logout({
        returnTo: window.location.origin
      });
      //console.log("Signed Out!");
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#router-view {
  animation-duration: 1.6s;
  /*animation-delay: 0.2s;*/
}

#footer {
  /*border-top-style: solid;
  border-width: thin;*/
  font-size: 0.6rem;
}

/*#nav {
  padding-bottom: 10px;
  z-index: 99;
}*/

/*.dropdown:hover .dropdown-menu {
  display: block;
}*/

.dropdown-toggle:after {
  content: none
}

.page {
  padding-top: 80px;
}

/*#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav b-nav-item.router-link-exact-active {
  color: #42b983;
}*/
</style>
