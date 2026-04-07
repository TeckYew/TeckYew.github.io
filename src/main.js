import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Set theme immediately before app mounts
const setInitialTheme = () => {
  const savedDarkMode = localStorage.getItem('darkMode')
  
  let isDark
  if (savedDarkMode !== null) {
    isDark = savedDarkMode === 'true'
  } else {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    localStorage.setItem('darkMode', isDark ? 'true' : 'false')
  }
  
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

setInitialTheme()

const app = createApp(App)

app.use(router)

app.mount('#app')
