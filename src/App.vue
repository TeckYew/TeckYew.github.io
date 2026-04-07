<template>
  <div class="d-flex flex-column min-vh-100 app-container">
    <NavBar :loggedInObj="userLogin" />
    <!-- need to update navbar with props / if else -->
    <RouterView :class="{ 'has-top-padding': shouldAddPadding }" class="mt-auto" />
    <Footer class="mt-auto" />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/FooterBanner.vue'

export default {
  components: {
    NavBar,
    Footer,
    RouterLink,
    RouterView
  },
  setup() {
    return {
      route: useRoute()
    }
  },
  computed: {
    shouldAddPadding() {
      // Add padding to all pages EXCEPT About Me and Home pages
      return this.route.name !== 'about' && this.route.name !== 'home'
    }
  },
  data() {
    return {
      userLogin: {
        loggedIn: false
      }
    }
  }
}
</script>
<!-- To do SASS here -->
<!-- Sample SASS w Bulma from line 93 onwards-->
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.app-container {
  /* No global padding */
}

.has-top-padding {
  padding-top: 100px;
}

body {
  background-color: black;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  /* margin-top: 2rem; */
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    /* margin-left: -1rem; */
    font-size: 1rem;

    padding: 1rem 0;
    /* margin-top: 1rem; */
  }
}
</style>

<!-- <style lang="scss">
$colors: (
  "body": ($white, $black)
);
</style> -->
<!-- Sample Bulma Code -->
<!-- <style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: rgba(108, 221, 236, 0.95);
//rgba(26, 243, 243, 0.13);
//#79baf7;
$primary-invert: findColorInvert($primary);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white" : ($white, $black),
  "black" : ($black, $white),
  "light" : ($light, $light-invert),
  "dark" : ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info" : ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger" : ($danger, $danger-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style> -->
