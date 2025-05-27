<script lang="ts">
import { defineComponent } from 'vue'
import axiosInstance from '@/services/axiosInstance.ts'

interface Member {
  id:number
  name: string
  email: string
  phone: string
  startDate: Date
  endDate: Date
  membershipId: number
  planName: string
  status: string
  planDuration: number
}

export default defineComponent({
  name: 'ManageMembersView',
  data() {
    return {
      members: [] as Member[],
      newMember: {
        name: '',
        email: '',
        plan: '',
        status: 'Active' as 'Active' | 'Expired',
      },
      showAddMemberPopup: false,
      showDeleteConfirmPopup: false,
      memberToDeleteIndex: -1
    }
  },
  mounted() {
    const gym_id:number=parseInt(localStorage.getItem('gym_id') || "0" );
    if(gym_id == 0){
      console.warn(" invalid Member ID ")
    }
    if(!gym_id){
      this.$router.push({ name: 'login'});
      return ;
    }
    axiosInstance.get(`/member`).then((res)=>{
         this.members=res.data;
    }).catch((e)=>{
      console.error( "Error in fetching the members Details : "+e);
    });
  },
  methods: {
    openAddMemberPopup() {
      this.newMember = { name: '', email: '', plan: '', status: 'Active' }
      this.showAddMemberPopup = true
    },
    goToAddMember() {
      this.$router.push({ name:"new-member"});
    },
    addMember() {

      if (!this.newMember.name || !this.newMember.email || !this.newMember.plan) {
        alert('Please fill in all required fields')
        return
      }
      this.showAddMemberPopup = false
    },
    navigateToMemberEdit(index: number) {
      this.$router.push('/dashboard/member/edit/'+index)
    },
    deleteMember() {
      if (this.memberToDeleteIndex >= 0) {
        this.members.splice(this.memberToDeleteIndex, 1)
        this.showDeleteConfirmPopup = false
        this.memberToDeleteIndex = -1
      }
    }
  }
})
</script>

<template>
  <div class="text-gray-800">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">Manage Members</h1>
      <button
        @click="goToAddMember"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
      >
        Add Member
      </button>
    </div>

    <!-- Members Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="min-w-full table-auto text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Phone</th>
            <th class="px-6 py-3">Plan</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in members" :key="index" class="border-t border-gray-200">
            <td class="px-6 py-4">{{ member.name }}</td>
            <td class="px-6 py-4">{{ member.phone }}</td>
            <td class="px-6 py-4">{{ member.planName }} - {{ member.planDuration }}</td>
            <td class="px-6 py-4 text-center ">
                <span
                  :class="{
                    'text-green-600': member.status == 'ACTIVE' ,
                    'text-red-600': member.status == 'EXPRIED',
                    'text-blue-600' :member.status == 'UPCOMING'
                  }"
                >
                  {{ member.status }}
                </span>
            </td>
            <td class="px-6 py-4">
              <button @click="navigateToMemberEdit(member.id)" class="text-blue-600 hover:underline">
                Edit
              </button>
            </td>
          </tr>
          <tr v-if="members.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-gray-500">No members found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
h1,
h2 {
  color: white;
}
</style>
