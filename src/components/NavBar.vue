<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { useToast } from 'vue-toastification'
// import { auth } from 'firebase'
const route = useRoute()

defineProps({
  loggedInObj: {
    type: Object
  }
})

const isAboutPage = () => route.path === '/about'
</script>

<template>
  <div id="grey" class="container-fluid" :class="{ 'navbar-about': isAboutPage() }">
    <nav id="nav" class="navbar navbar-brand navbar-expand-lg navbar-light w-screen" :class="{ 'navbar-about': isAboutPage() }">
      <RouterLink class="navbar-brand logo-link" to="/">
        <img
          class="d-inline-block align-top float-left navbar-logo"
          src="../assets/deckeyew-logo.svg"
          alt="Teck Yew"
          height="50"
        />
      </RouterLink>

      <button
        class="navbar-toggler me-4"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-item" id="navbarNavDropdown">
        <ul class="navbar-nav ml-auto mb-2 me-auto">
          <li class="nav-item active mx-2" v-if="loggedInObj.loggedIn">
            <RouterLink
              class="nav-link"
              v-if="loggedInObj.userType == 1"
              aria-current="page"
              to="/UserHome"
            >
              <span class="d-lg-none">Dashboard</span>
              <span class="d-none d-lg-block">Dashboard</span>
            </RouterLink>
            <RouterLink
              class="nav-link"
              v-if="loggedInObj.userType == 2"
              aria-current="page"
              to="/OrgUserHome"
            >
              <span class="d-lg-none">Summary Dashboard</span>
              <span class="d-none d-lg-block">Summary Dashboard</span>
            </RouterLink>
          </li>
          <li class="nav-item active mx-2" v-if="loggedInObj.userType != 2">
            <RouterLink class="nav-link" aria-current="page" to="/">
              <span class="d-lg-none">Home</span>
              <span class="d-none d-lg-block">Home</span>
            </RouterLink>
          </li>

          <li class="nav-item mx-2">
            <RouterLink class="nav-link" to="/about">
              <span class="d-lg-none">About Me</span>
              <span class="d-none d-lg-block">About Me</span>
            </RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav mb-md-0 ms-md-0 mb-lg-3 me-lg-3">
          <li class="nav-item mx-2">
            <RouterLink class="nav-link" to="/chess">
              <span class="d-lg-none">Have A Little Fun!</span>
              <span class="d-none d-lg-block">Have A Little Fun!</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      loggedIn: true
    }
  },
  methods: {
    async logout() {
      const auth = getAuth()
      const toast = useToast()
      await signOut(auth)
        .then(() => {
          console.log('logout successfully')
          window.localStorage.clear()
        })
        .catch((error) => {
          // console.log('An error has occurred...')
          // do nothing
          console.log('Good bye!')
        })
        toast.success('See you again soon!', {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 1.48,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
      this.$router.push('/')
    }
  }
}
</script>
<style>
.navbar {
  background-color: #f8f9fa;
  width: 100%;
}

.nav-link {
  position: relative;
  transition: all 0.3s ease;
  color: #333 !important;
}

.nav-link:hover {
  color: #28a745 !important;
  transform: translateY(-2px);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #28a745;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.navbar-logo {
  transition: transform 0.8s ease;
  transform-style: preserve-3d;
}

.logo-link:hover .navbar-logo {
  animation: coinFlip 0.8s ease-in-out;
}

@keyframes coinFlip {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
</style>

