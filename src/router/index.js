// Necessary utility imports
import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Home View
import HomeView from '../views/HomeView.vue'

// Error View
import ErrorView from '../views/ErrorVue.vue'



// Chess Game View
import ChessView from '../views/ChessView.vue'

// About Me View
import AboutMeView from '../views/AboutMeView.vue'

// Project Detail View
import ProjectDetailView from '../views/ProjectDetailView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      // Scroll to element with ID matching the hash
      const element = document.querySelector(to.hash)
      if (element) {
        return {
          el: to.hash,
          behavior: 'smooth'
        }
      }
    }
    // Default: scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutMeView
    },
    {
      path: '/project/:id',
      name: 'projectDetail',
      component: ProjectDetailView
    },
    {
      path: '/chess',
      name: 'chess',
      component: ChessView
    },
    {
      path: '/Error',
      component: ErrorView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/Error'
    }
  ],
  linkExactActiveClass: 'is-active'
})

const checkUser = () => {
  return new Promise((res, rej) => {
    const state = onAuthStateChanged(
      getAuth(),
      (user) => {
        state()
        res(user)
      },
      rej
    )
  })
}

router.beforeEach(async (to, from, next) => {
  // if the next route requires authentication
  if (to.matched.some((route) => route.meta.authReq)) {
    // check user authentication state
    if (await checkUser()) {
      next() // if true, move to the next page
    } else {
      // redirect them to login page
      next('/login?err=logReq')
    }
  } else {
    next() // as per normal if login is not required
  }
})

export { checkUser }
export default router
