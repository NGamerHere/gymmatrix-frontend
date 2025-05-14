<script lang="ts">
import { defineComponent } from 'vue'
import axiosInstance from '@/services/axiosInstance.ts'

interface StatsResponse {
  totalActiveMembers: number
  totalMembers: number
  totalRevenue: number
  totalMemberships: number
  memberInfo: MembersInfo[]
}

interface MembersInfo {
  name: string
  planDuration: number
  planName: string
  active: boolean
}

export default defineComponent({
  name: 'DashboardView',
  data() {
    return {
      customers: [] as MembersInfo[],
      stats: {
        totalCustomers: 0,
        activeMembers: 0,
        totalRevenue: 0,
        totalMemberships: 0,
      },
    }
  },
  mounted() {
    axiosInstance
      .get<StatsResponse>('admin/1/dashboard')
      .then((res) => {
        this.stats.totalCustomers = res.data.totalMembers
        this.stats.activeMembers = res.data.totalActiveMembers
        this.stats.totalRevenue = res.data.totalRevenue
        this.stats.totalMemberships = res.data.totalActiveMembers
        this.customers = res.data.memberInfo
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error)
      })
  },
  methods: {},
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex">
    <!-- Main Content -->
    <div class="flex-1 p-8 overflow-y-auto">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white">Dashboard</h1>
        <p class="text-lg text-gray-200">Welcome back, Gym Owner!</p>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-gray-800">Total Customers</h3>
          <p class="text-2xl text-indigo-600">{{ stats.totalCustomers }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-gray-800">Active Members</h3>
          <p class="text-2xl text-green-600">{{ stats.activeMembers }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-gray-800">Total Revenue</h3>
          <p class="text-2xl text-yellow-600">₹{{ stats.totalRevenue }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-gray-800">Total Memberships</h3>
          <p class="text-2xl text-purple-600">{{ stats.totalMemberships }}</p>
        </div>
      </div>

      <!-- Customer Management Section -->
      <div class="mt-12">
        <h2 class="text-3xl font-semibold text-white mb-6">Customer Management</h2>
        <table
          class="min-w-full table-auto text-gray-700 bg-white shadow-md rounded-lg overflow-hidden"
        >
          <thead>
            <tr>
              <th class="px-6 py-3 text-left">Name</th>
              <th class="px-6 py-3 text-left">Membership</th>
              <th class="px-6 py-3 text-left">Status</th>
              <th class="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in customers" :key="index">
              <td class="px-6 py-4">{{ customer.name }}</td>
              <td class="px-6 py-4">{{ customer.planName }}</td>
              <td class="px-6 py-4">
                <span
                  :class="{
                    'text-green-600': customer.active,
                    'text-red-600': !customer.active,
                  }"
                >
                  {{ customer.active ? 'Active' : 'Expired' }}
                </span>
              </td>

              <td class="px-6 py-4">
                <button class="text-indigo-600 hover:text-indigo-800">Edit</button>
                <button class="text-red-600 hover:text-red-800 ml-4">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles here if needed */
</style>
