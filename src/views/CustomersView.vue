<script lang="ts">
import { defineComponent } from 'vue'
import BasePopup from '@/components/Popup.vue'
import axiosInstance from '@/services/axiosInstance.ts'

interface Member {
  name: string
  email: string
  planName: string
  active: boolean
  planDuration: number
}

export default defineComponent({
  name: 'ManageMembersView',
  components: {
    BasePopup
  },
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
    const gym_id:number=localStorage.getItem('gym_id');
    if(!gym_id){
      this.$router.push({ name: 'login'});
      return ;
    }
    axiosInstance.get(`/admin/${gym_id}/member`).then((res)=>{
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
    addMember() {

      if (!this.newMember.name || !this.newMember.email || !this.newMember.plan) {
        alert('Please fill in all required fields')
        return
      }

      this.members.push({ ...this.newMember })
      this.showAddMemberPopup = false
    },
    confirmDeleteMember(index: number) {
      this.memberToDeleteIndex = index
      this.showDeleteConfirmPopup = true
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
        @click="openAddMemberPopup"
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
            <th class="px-6 py-3">Email</th>
            <th class="px-6 py-3">Plan</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in members" :key="index" class="border-t border-gray-200">
            <td class="px-6 py-4">{{ member.name }}</td>
            <td class="px-6 py-4">{{ member.email }}</td>
            <td class="px-6 py-4">{{ member.planDuration }}</td>
            <td class="px-6 py-4">
              <span
                :class="{
                    'text-green-600': member.active,
                    'text-red-600': !member.active,
                  }"
              >
                  {{ member.active ? 'Active' : 'Expired' }}
                </span>
            </td>
            <td class="px-6 py-4">
              <button @click="confirmDeleteMember(index)" class="text-red-600 hover:underline">
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="members.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-gray-500">No members found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Member Popup -->
    <BasePopup
      :isOpen="showAddMemberPopup"
      title="Add New Member"
      confirmButtonText="Save Member"
      @close="showAddMemberPopup = false"
      @confirm="addMember"
    >
      <div class="grid grid-cols-1 gap-4">
        <input
          v-model="newMember.name"
          type="text"
          placeholder="Full Name"
          class="border border-gray-300 p-3 rounded"
        />
        <input
          v-model="newMember.email"
          type="email"
          placeholder="Email"
          class="border border-gray-300 p-3 rounded"
        />
        <input
          v-model="newMember.plan"
          type="text"
          placeholder="Membership Plan"
          class="border border-gray-300 p-3 rounded"
        />
        <select v-model="newMember.status" class="border border-gray-300 p-3 rounded">
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>
      </div>
    </BasePopup>

    <!-- Delete Confirmation Popup -->
    <BasePopup
      :isOpen="showDeleteConfirmPopup"
      title="Confirm Deletion"
      confirmButtonText="Delete"
      @close="showDeleteConfirmPopup = false"
      @confirm="deleteMember"
    >
      <p>Are you sure you want to delete this member?</p>
    </BasePopup>
  </div>
</template>

<style scoped>
h1,
h2 {
  color: white;
}
</style>
