<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/FooterBanner.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <NavBar :loggedInObj="userLogin" />
    <!-- need to update navbar with props / if else -->
    <RouterView class="mt-auto" />
    <Footer class="mt-auto" />
  </div>
</template>

<script>
import { query, collection, addDoc, getDocs, where } from 'firebase/firestore'
import { db } from './firebase/index.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
export default {
  data() {
    return {
      events: [],
      userLogin: {
        username: undefined,
        email: undefined,
        loggedIn: false,
        userType: undefined,
        userid: undefined
      }
    }
  },
  created() {
    this.getEvents()
    let auth = getAuth()
    console.log(auth)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('currently logged in - userid:', user.email)
        this.getUser(user)
      } else {
        console.log('currently not logged in')
        this.userLogin.loggedIn = false
        this.userLogin.userType = undefined
        this.userLogin.userid = undefined
        window.localStorage.clear()
      }
    })
  },
  methods: {
    async getEvents() {
      // query to get all docs in 'countries' collection
      const querySnap = await getDocs(query(collection(db, 'userevent')))

      // add each doc to 'countries' array
      querySnap.forEach((doc) => {
        this.events.push(doc.data())
      })
    },
    async getUser(user) {
      const querySnap = await getDocs(
        query(collection(db, 'users'), where('email', '==', user.email))
      )
      if (!querySnap.empty) {
        // add each doc to 'countries' array
        querySnap.forEach((doc) => {
          // this.events.push(doc.data().eventid)
          this.userLogin.userType = doc.data().userType
          this.userLogin.userid = doc.id
          this.userLogin.username = doc.data().name
          this.userLogin.points = doc.data().points
        })
        this.userLogin.loggedIn = true
        this.userLogin.email = user.email
        window.localStorage.setItem('email', this.userLogin.email)
        window.localStorage.setItem('userType', this.userLogin.userType)
        window.localStorage.setItem('userid', this.userLogin.userid)
        window.localStorage.setItem('username', this.userLogin.username)
        window.localStorage.setItem('points', this.userLogin.points)
        let navList = document.getElementById('nav').classList

        if (this.userLogin.userType == 2) {
          navList.remove('navbar-light')
          navList.add('navbar-dark')
          navList.add('bg-dark')
          navList.add('bg-dark')

          document.getElementById('grey').classList.add('bg-dark')
        } else {
          navList.remove('navbar-dark')
          navList.remove('bg-dark')
          navList.add('navbar-light')
          if (document.getElementById('grey').classList.contains('bg-dark')) {
            document.getElementById('grey').classList.remove('bg-dark')
          }
        }
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
