import TrainerManagment from '@/views/adminDashboard/trainer/TrainerManagment.vue'

export default {
  path:"trainer",
  name:'trainer',
  children:[
    {
      path:'',
      name: 'trainerHome',
      component: TrainerManagment,
    }
  ]
}
