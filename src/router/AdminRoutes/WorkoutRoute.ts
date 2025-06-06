import WorkoutManagementView from '@/views/adminDashboard/workout/WorkoutManagementView.vue'
import AddNewWorkoutView from '@/views/adminDashboard/workout/AddNewWorkoutView.vue'

export default {
  name: 'Workout',
  path: 'workout',
  children: [
    {
      path:'',
      name:'WorkoutManagement',
      component:WorkoutManagementView
    },{
      path:'add',
      name:'addWorkout',
      component:AddNewWorkoutView
    }
  ]

}
