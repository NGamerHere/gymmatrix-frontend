import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardView from '@/views/Dashboard.vue'
import MemberView from '@/views/adminDashboard/member/MemberView.vue'
import MembershipsView from '@/views/MembershipsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import EditingMember from '@/views/adminDashboard/member/EditingMember.vue'
import AddingNewMember from '@/views/adminDashboard/member/AddingNewMember.vue'
import PlansManagementView from '@/views/adminDashboard/plans/PlansManagementView.vue'
import TrainerManagment from '@/views/adminDashboard/trainer/TrainerManagment.vue'

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
    },{
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'DashboardHome',
          component: DashboardView,
        },{
          path:"member",
          name: 'member',
          children :[
            {
              path:'',
              name: 'memberHome',
              component: MemberView,
            },
            {
               path:'new',
              name:"new-member",
              component:AddingNewMember
            },{
              path: 'edit/:member_id',
              name:"edit-member",
              component: EditingMember,
            }
          ]
        },{
          path:"trainer",
          name:'trainer',
          children:[
            {
              path:'',
              name: 'trainerHome',
              component: TrainerManagment,
            }
          ]
        }, {
          path: 'memberships',
          component: MembershipsView,
        },
        {
          path: 'settings',
          component: SettingsView,
        },{
          path:'plans',
          name:'plans',
          component: PlansManagementView,
        }
      ],
    }
  ],
})

export default router
