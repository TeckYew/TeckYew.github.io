<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { useToast } from 'vue-toastification'
import { ref, onMounted } from 'vue'
// import { auth } from 'firebase'
const route = useRoute()
const isDarkMode = ref(false)
const isNavExpanded = ref(false)

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

const handleNavMouseEnter = () => {
  isNavExpanded.value = true
}

const handleNavMouseLeave = () => {
  isNavExpanded.value = false
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode') === 'true'
  isDarkMode.value = savedDarkMode
  document.documentElement.setAttribute('data-theme', savedDarkMode ? 'dark' : 'light')
})
</script>

<template>
  <div 
    id="navbar-container"
    class="navbar-container"
    @mouseenter="handleNavMouseEnter"
    @mouseleave="handleNavMouseLeave"
    :class="{ expanded: isNavExpanded }"
  >
    <nav id="nav" class="navbar-expanded">
      <!-- Logo/Brand -->
      <div class="navbar-brand">
        <div class="navbar-logo-wrapper">
          <svg class="navbar-logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- White background circle -->
            <circle cx="50" cy="50" r="48" fill="white"/>
            
            <!-- TY text in black with signature style - extra thick with stroke -->
            <text x="50" y="50" font-family="'Impact', 'Arial Black', 'Courier New', monospace" font-size="56" font-weight="900" text-anchor="middle" dominant-baseline="middle" fill="#000000" letter-spacing="0" font-style="italic" opacity="1" stroke="#000000" stroke-width="0.8">
              TY
            </text>
            
            <!-- Decorative line under TY with slight curve effect -->
            <path d="M 28 72 Q 50 75 72 72" stroke="#0088cc" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="navbar-brand-text">TeckYew</span>
      </div>

      <!-- Navigation Links Container -->
      <div class="nav-links-container" :class="{ active: isNavExpanded }">
        <!-- Top Navigation Links -->
        <ul class="nav-menu">
          <li class="nav-item" v-if="loggedInObj.loggedIn">
            <RouterLink
              class="nav-link"
              v-if="loggedInObj.userType == 1"
              to="/UserHome"
            >
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Dashboard</span>
            </RouterLink>
            <RouterLink
              class="nav-link"
              v-if="loggedInObj.userType == 2"
              to="/OrgUserHome"
            >
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Dashboard</span>
            </RouterLink>
          </li>
          <li class="nav-item" v-if="loggedInObj.userType != 2">
            <RouterLink class="nav-link" to="/">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Home</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4M12 8h.01"></path>
              </svg>
              <span>About</span>
            </RouterLink>
          </li>
        </ul>

        <!-- Bottom Navigation Links (Fun & Dark Mode) -->
        <ul class="nav-menu">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/chess">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="12 3 20 7 20 17 12 21 4 17 4 7 12 3"></polyline>
                <line x1="12" y1="12" x2="20" y2="7"></line>
                <line x1="12" y1="12" x2="12" y2="21"></line>
                <line x1="12" y1="12" x2="4" y2="7"></line>
              </svg>
              <span>Have Fun!</span>
            </RouterLink>
          </li>
          <li class="nav-item dark-mode-item">
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
/* Navbar Container - Centered and Minimalist */
.navbar-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1030;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Main Navbar */
.navbar-expanded {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(50px) saturate(240%);
  border-radius: 50px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  padding: 12px 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Dark mode - navbar background */
html[data-theme='dark'] .navbar-expanded {
  background: rgba(30, 30, 30, 0.1);
  border-color: rgba(255, 255, 255, 0.12);
  color: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

/* Brand Container - Always Visible */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #1a1a1a;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-right: 16px;
}

html[data-theme='dark'] .navbar-brand {
  color: #fff;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.navbar-logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.navbar-brand:hover .navbar-logo-wrapper {
  filter: drop-shadow(0 8px 24px rgba(0, 150, 200, 0.6));
  transform: scale(1.15);
}

.navbar-logo-svg {
  width: 100%;
  height: 100%;
  transition: transform 0.8s ease-in-out;
  transform-style: preserve-3d;
}

.navbar-brand:hover .navbar-logo-svg {
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

/* Brand Text */
.navbar-brand-text {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: #1a1a1a;
  white-space: nowrap;
  transition: all 0.3s ease;
  font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', sans-serif;
}

html[data-theme='dark'] .navbar-brand-text {
  color: #f0f0f0;
}

/* Navigation Links Container - Expands on Hover */
.nav-links-container {
  display: flex;
  align-items: center;
  gap: 0;
  max-width: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}

.nav-links-container.active {
  max-width: 550px;
  opacity: 1;
}

/* Navigation Menu Lists */
.nav-menu {
  display: flex;
  list-style: none;
  gap: 4px;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-links-container.active .nav-menu {
  margin: 0 4px;
}

.nav-menu + .nav-menu {
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  padding-left: 4px;
  margin-left: 4px;
}

html[data-theme='dark'] .nav-menu + .nav-menu {
  border-left-color: rgba(255, 255, 255, 0.08);
}

/* Navigation Items */
.nav-item {
  white-space: nowrap;
  transform: scale(0.85);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.nav-links-container.active .nav-item {
  transform: scale(1);
  opacity: 1;
}

/* Stagger animation for each nav item */
.nav-links-container.active .nav-menu:first-of-type .nav-item:nth-child(1) {
  transition-delay: 0.08s;
}

.nav-links-container.active .nav-menu:first-of-type .nav-item:nth-child(2) {
  transition-delay: 0.12s;
}

.nav-links-container.active .nav-menu:first-of-type .nav-item:nth-child(3) {
  transition-delay: 0.16s;
}

.nav-links-container.active .nav-menu:last-of-type .nav-item:nth-child(1) {
  transition-delay: 0.2s;
}

.nav-links-container.active .nav-menu:last-of-type .nav-item:nth-child(2) {
  transition-delay: 0.24s;
}

/* Navigation Links Styling */
.nav-link {
  position: relative;
  padding: 8px 14px;
  color: #000000 !important;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.2px;
  font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', sans-serif;
  border-radius: 8px;
  background: transparent;
}

.nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

html[data-theme='dark'] .nav-link {
  color: #ffffff !important;
}

html[data-theme='dark'] .nav-icon {
  color: #ffffff !important;
}

.nav-link:hover {
  background: rgba(0, 136, 204, 0.15);
  color: #0088cc;
  transform: translateY(-1px);
  border: 1px solid rgba(0, 136, 204, 0.4);
}

html[data-theme='dark'] .nav-link:hover {
  background: rgba(0, 136, 204, 0.25);
  color: #00d9e9 !important;
  border-color: rgba(0, 200, 220, 0.5);
}

.nav-link:hover .nav-icon {
  color: currentColor;
  transform: scale(1.1);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 14px;
  width: 0;
  height: 0;
  background-color: transparent;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 0;
}

/* Dark Mode Toggle Button */
.dark-mode-item {
  display: flex !important;
  align-items: center !important;
  padding: 0 2px !important;
  transform: scale(1) !important;
  opacity: 1 !important;
  margin: 0 !important;
}

.dark-mode-toggle {
  background: none;
  border: 1.5px solid #0088cc;
  color: #0088cc;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  flex-shrink: 0;
}

.dark-mode-toggle:hover {
  background-color: rgba(0, 136, 204, 0.12);
  transform: scale(1.15) rotate(20deg);
  box-shadow: 0 4px 12px rgba(0, 136, 204, 0.28);
  border-color: #00d4ff;
}

.toggle-icon {
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode-toggle:active .toggle-icon {
  transform: rotate(180deg);
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-container {
    top: 10px;
    padding: 0 15px;
  }

  .navbar-expanded {
    padding: 10px 12px;
    gap: 3px;
  }

  .navbar-logo-wrapper {
    width: 40px;
    height: 40px;
  }

  .navbar-brand-text {
    font-size: 13px;
  }

  .nav-link {
    font-size: 13px;
    padding: 6px 12px;
  }

  .dark-mode-toggle {
    width: 28px;
    height: 28px;
  }

  .toggle-icon {
    width: 13px;
    height: 13px;
  }

  .nav-links-container.active {
    max-width: 350px;
  }
  
  .navbar-brand {
    margin-right: 12px;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    top: 8px;
    padding: 0 10px;
  }

  .navbar-brand-text {
    display: none;
  }

  .navbar-expanded {
    padding: 8px 8px;
    gap: 2px;
  }

  .navbar-logo-wrapper {
    width: 38px;
    height: 38px;
  }

  .nav-link {
    font-size: 11px;
    padding: 5px 10px;
    gap: 4px;
  }

  .nav-icon {
    width: 16px;
    height: 16px;
  }

  .dark-mode-toggle {
    width: 26px;
    height: 26px;
  }

  .toggle-icon {
    width: 12px;
    height: 12px;
  }

  .nav-links-container.active {
    max-width: 280px;
  }

  .navbar-brand {
    margin-right: 8px;
  }
}
</style>

