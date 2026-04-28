import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from '../views/ErrorVue.vue'
import ChessView from '../views/ChessView.vue'
import AboutMeView from '../views/AboutMeView.vue'
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

export default router
