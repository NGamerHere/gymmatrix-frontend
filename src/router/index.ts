import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminRoutes from '@/router/AdminRoutes/index.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },{
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },{
      path:"/logout",
      name:'logout',
      component: () => import('../views/Logout.vue'),
    },AdminRoutes
  ],
})

export default router
