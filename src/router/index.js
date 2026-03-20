// Necessary utility imports
import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Home View
import HomeView from '../views/HomeView.vue'

// Error View
import ErrorView from '../views/ErrorVue.vue'

// User Related Views
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserHomeView from '../views/UserHomeView.vue'
import OrgHomeView from '../views/OrgHomeView.vue'
// Probably to include Update Profile, View Profile Views

// Organization User Related Views
import CreateEventView from '../views/CreateEventView.vue'
import OUDashboard from '../components/OrgUsers/OUDashboard.vue'

// Events Related Views
import EventsView from '../views/EventsView.vue'
import UpdateEvent from '../components/Events/UpdateEvent.vue'
import EventsIndex from '../components/Events/EventsIndex.vue'
import EventDetails from '../components/Events/EventDetails.vue'
import ManageParticipants from '../components/Events/ManageParticipants.vue'

// User Profile & Chat Views
import Profile from '../views/Profile.vue'
import Chatbot from '../components/chatbot/Chatbot.vue'

// Chess Game View
import ChessView from '../views/ChessView.vue'

// About Me View
import AboutMeView from '../views/AboutMeView.vue'

// Project Detail View
import ProjectDetailView from '../views/ProjectDetailView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/UserHome',
      name: '/UserHome',
      component: UserHomeView,
      meta: {
        authReq: true
      }
    },
    {
      path: '/OrgHome',
      name: '/OrgHome',
      component: OrgHomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegisterView
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
      children: [
        {
          path: '',
          name: 'index',
          component: EventsIndex
        },
        {
          path: 'create',
          name: 'create',
          component: CreateEventView,
          props: true
        },
        {
          path: 'update/:eventId',
          name: 'updateEvent',
          component: UpdateEvent,
          props: true
        },
        {
          path: 'details/:event_id',
          name: 'eventDetails',
          component: EventDetails,
          props: true
        },
        {
          path: 'participants/:eventId&:eventTitle&:eventDate',
          name: 'participantDetails',
          component: ManageParticipants,
          props: true
        }
      ]
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
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        authReq: true
      }
    },
    {
      path: '/orgUserHome',
      name: 'orgUserHome',
      component: OUDashboard,
      meta: {
        authReq: true
      }
    },
    {
      path: '/chatbot',
      name: 'chatbot',
      component: Chatbot,
      meta: {
        authReq: true
      }
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
