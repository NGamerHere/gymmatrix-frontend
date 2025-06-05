import DashboardLayout from '@/layouts/DashboardLayout.vue'
import MembershipRoute from '@/router/AdminRoutes/MembershipRoute.ts'
import Member from '@/router/AdminRoutes/MemberRoute.ts'
import Trainer from '@/router/AdminRoutes/trainerRoute.ts'
import settings from '@/router/AdminRoutes/SettingsRoute.ts'
import Dashboard from '@/router/AdminRoutes/DashboardRoute.ts'
import Workout from '@/router/AdminRoutes/WorkoutRoute.ts'
import PlansRoute from '@/router/AdminRoutes/PlansRoute.ts'
import EquipmentManagerRoute from '@/router/AdminRoutes/EquipmentManagerRoute.ts'

export default {
  path: '/dashboard',
  name: 'Dashboard',
  component: DashboardLayout,
  children: [
    Dashboard,Member,Trainer, MembershipRoute,settings,Workout,PlansRoute,EquipmentManagerRoute
  ],
}
