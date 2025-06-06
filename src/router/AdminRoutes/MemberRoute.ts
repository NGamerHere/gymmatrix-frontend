import MemberView from '@/views/adminDashboard/member/MemberView.vue'
import AddingNewMember from '@/views/adminDashboard/member/AddingNewMember.vue'
import EditingMember from '@/views/adminDashboard/member/EditingMember.vue'


export default {
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
}
