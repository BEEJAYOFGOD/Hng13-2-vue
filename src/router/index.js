import { createRouter, createWebHistory } from 'vue-router'
// Layouts
import RootLayout from '@/layout/RootLayout.vue'
import DashboardLayout from '@/layout/DashboardLayout.vue'

// Pages
// import LandingPage from '@/views/Landing.vue'
import Login from '@/views/auth/LoginView.vue'
import Signup from '@/views/auth/SignupView.vue'
import Dashboard from '@/views/dashboard/DashboardView.vue'
import AllTickets from '@/views/dashboard/AllTicketsView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import CreateEditTicket from '/views/dashboard/CreateEditTicket.vue'
import LandingPage from '@/views/LandingPage.vue'

// Auth check function
function isAuthenticated() {
  const session = localStorage.getItem('ticketapp_session')
  return !!session
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Root layout routes (Landing, Auth pages)
    {
      path: '/',
      component: RootLayout,
      children: [
        {
          path: '',
          name: 'landing',
          component: LandingPage,
        },
        {
          path: 'auth/login',
          name: 'login',
          component: Login,
        },
        {
          path: 'auth/signup',
          name: 'signup',
          component: Signup,
        },
      ],
    },

    // Dashboard routes (Protected)
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
        },
      ],
    },

    // Tickets routes (Protected)
    {
      path: '/tickets',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'tickets',
          component: AllTickets,
        },
        {
          path: 'create',
          name: 'tickets-create',
          component: CreateEditTicket,
        },
        {
          path: 'active',
          name: 'tickets-active',
          component: AllTickets,
        },
        {
          path: 'edit/:id',
          name: 'tickets-edit',
          component: CreateEditTicket,
        },
      ],
    },

    // Catch-all 404 - redirect to home
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// Navigation guard (Protected Route equivalent)
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated()) {
    // Redirect to login if trying to access protected route
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'signup') && isAuthenticated()) {
    // Redirect to dashboard if already logged in and trying to access auth pages
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
