import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardView from '@/views/Dashboard.vue'
import CustomersView from '@/views/CustomersView.vue'
import MembershipsView from '@/views/MembershipsView.vue'
import SettingsView from '@/views/SettingsView.vue'

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
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },{
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          component: DashboardView,
        },
        {
          path: 'customers',
          component: CustomersView,
        },
        {
          path: 'memberships',
          component: MembershipsView,
        },
        {
          path: 'settings',
          component: SettingsView,
        },
      ],
    }
  ],
})

export default router
