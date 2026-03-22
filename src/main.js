import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import store from './store/index'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

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

app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true
})

app.use(VueSweetalert2)

app.use(router)

app.use(store)

app.component('VueDatePicker', VueDatePicker)

app.mount('#app')
