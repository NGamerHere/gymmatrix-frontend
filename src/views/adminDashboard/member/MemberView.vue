<script lang="ts">
import { defineComponent } from 'vue'
import axiosInstance from '@/services/axiosInstance.ts'

interface Member {
  id: number
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
      memberToDeleteIndex: -1,
    }
  },
  mounted() {
    const gym_id: number = parseInt(localStorage.getItem('gym_id') || '0')
    if (!gym_id) {
      console.warn('Invalid Member ID')
      this.$router.push({ name: 'login' })
      return
    }

    axiosInstance
      .get(`/member`)
      .then((res) => {
        this.members = res.data
      })
      .catch((e) => {
        console.error('Error fetching member details: ' + e)
      })
  },
  methods: {
    goToAddMember() {
      this.$router.push({ name: 'new-member' })
    },
    navigateToMemberEdit(id: number) {
      this.$router.push(`/dashboard/member/edit/${id}`)
    },
  },
})
</script>

<template>
  <div class="min-h-screen p-4 md:p-8 bg-gradient-to-br text-gray-800 dark:text-white bg-white dark:bg-gray-900 ">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold ">Manage Members</h1>
      <button
        @click="goToAddMember"
        class="bg-white text-indigo-600 hover:bg-gray-100 px-3 py-2 rounded-lg shadow font-semibold"
      >
        + Add Member
      </button>
    </div>

    <!-- Desktop View -->
    <div class="hidden md:block bg-white rounded-lg shadow-md overflow-x-auto">
      <table class="min-w-full table-auto text-left">
        <thead class="bg-gray-100 text-gray-700">
        <tr>
          <th class="px-6 py-3">Name</th>
          <th class="px-6 py-3">Phone</th>
          <th class="px-6 py-3">Plan</th>
          <th class="px-6 py-3 text-center">Status</th>
          <th class="px-6 py-3">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(member, index) in members"
          :key="index"
          class="border-t border-gray-200"
        >
          <td class="px-6 py-4">{{ member.name.charAt(0).toUpperCase() + member.name.slice(1) }}</td>
          <td class="px-6 py-4">{{ member.phone }}</td>
          <td class="px-6 py-4">{{ member.planName }} - {{ member.planDuration }} days</td>
          <td class="px-6 py-4 text-center">
              <span
                :class="{
                  'text-green-600 font-semibold': member.status === 'ACTIVE',
                  'text-red-600 font-semibold': member.status === 'EXPIRED',
                  'text-blue-600 font-semibold': member.status === 'UPCOMING',
                }"
              >
                {{ member.status }}
              </span>
          </td>
          <td class="px-6 py-4">
            <button
              @click="navigateToMemberEdit(member.id)"
              class="text-blue-600 hover:underline"
            >
              {{ member.planName && member.planDuration ? 'Edit' : 'Add membership' }}
            </button>
          </td>
        </tr>
        <tr v-if="members.length === 0">
          <td colspan="5" class="px-6 py-4 text-center text-gray-500">No members found.</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden space-y-4">
      <div
        v-for="(member, index) in members"
        :key="index"
        class="bg-white rounded-lg shadow p-4"
      >
        <div class="flex justify-between items-center mb-2">
          <p class="text-lg font-semibold text-gray-800">{{ member.name.charAt(0).toUpperCase() + member.name.slice(1) }}</p>
          <button
            @click="navigateToMemberEdit(member.id)"
            class="text-indigo-600 text-sm font-medium hover:underline"
          >
            {{ member.planName && member.planDuration ? 'Edit' : 'Add membership' }}
          </button>
        </div>
        <p class="text-sm text-gray-600">
          <strong>Phone:</strong> {{ member.phone }}
        </p>
        <p class="text-sm text-gray-600" v-if=" member.planName && member.planDuration " >
          <strong>Plan:</strong> {{ member.planName }} - {{ member.planDuration }} days
        </p>
        <p class="text-sm text-gray-600" v-else >
          <strong>No active plan</strong>
        </p>
        <p class="text-sm text-gray-600" v-if="member.status" >
          <strong>Status:</strong>
          <span
            :class="{
              'text-green-600 font-medium': member.status === 'ACTIVE',
              'text-red-600 font-medium': member.status === 'EXPIRED',
              'text-blue-600 font-medium': member.status === 'UPCOMING',
            }"
          >
            {{ member.status }}
          </span>
        </p>
      </div>

      <div v-if="members.length === 0" class="text-center text-white">
        No members found.
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional custom styles if needed */
</style>
