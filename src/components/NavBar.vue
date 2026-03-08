<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { useToast } from 'vue-toastification'
import { ref, onMounted } from 'vue'
// import { auth } from 'firebase'
const route = useRoute()
const isDarkMode = ref(false)

defineProps({
  loggedInObj: {
    type: Object
  }
})

const isAboutPage = () => route.path === '/about'

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode') === 'true'
  isDarkMode.value = savedDarkMode
  document.documentElement.setAttribute('data-theme', savedDarkMode ? 'dark' : 'light')
})
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
          <li class="nav-item mx-2 d-flex align-items-center">
            <button
              @click="toggleDarkMode"
              class="dark-mode-toggle"
              :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
              aria-label="Toggle dark mode"
            >
              <svg v-if="!isDarkMode" class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <svg v-else class="toggle-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
          </li>
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
  color: #17a2b8 !important;
  transform: translateY(-2px);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #17a2b8;
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

/* Dark Mode Toggle Button */
.dark-mode-toggle {
  background: none;
  border: 2px solid #17a2b8;
  color: #17a2b8;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dark-mode-toggle:hover {
  background-color: rgba(23, 162, 184, 0.1);
  transform: scale(1.1) rotate(20deg);
  box-shadow: 0 4px 12px rgba(23, 162, 184, 0.2);
}

.toggle-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.dark-mode-toggle:active .toggle-icon {
  transform: rotate(180deg);
}
</style>

