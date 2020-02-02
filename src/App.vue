<template>
<div id="app">
  <!--<div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>-->
  <div id="nav">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand to="/">InstaCaption</b-navbar-brand>

      <!--<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>-->

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/about">About</b-nav-item>
          <!--Put a nav guard on this route when it is created-->
          <b-nav-item href="#">Captions<b-icon-lock v-if="!this.$auth.isAuthenticated"></b-icon-lock>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <!--<em>Login</em>-->
              <h5>
                <!--<img style="size:1rem;" :src="$auth.user.picture">-->
                <div style="font-size:1rem;">{{profile.name}} </div>
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
  <router-view />
</div>
</template>

<script>
import {
  BIconList,
  BIconLock
} from 'bootstrap-vue'

export default {
  name: 'app',
  data() {
    return {
      profile: {
        name: this.$auth.user.given_name
      }
    };
  },
  components: {
    BIconList,
    BIconLock
  },
  mounted() {
    console.log(this.$auth.user);
    //this.$store.commit('updateAuth', this.$auth.isAuthenticated);
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
      console.log("Signed In");
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
      console.log("Signed Out!");
    }
    /*,
        handleLoginEvent(data) {
          this.$store.commit('updateAuth', this.$auth.isAuthenticated());
          this.profile = data.profile;
        }*/
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

#nav {
  position: sticky;
  padding-bottom: 10px;
}

/*.dropdown:hover .dropdown-menu {
  display: block;
}*/

.dropdown-toggle:after {
  content: none
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
