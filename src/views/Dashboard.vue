<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardView',
  data: () => ({
    customers: [
      { name: 'John Doe', membership: 'Gold', status: 'Active' },
      { name: 'Jane Smith', membership: 'Silver', status: 'Active' },
      { name: 'Mark Lee', membership: 'Platinum', status: 'Expired' },
    ],
    stats: {
      totalCustomers: 120,
      activeMembers: 95,
      totalRevenue: '$15,000',
      totalMemberships: 60,
    }
  }),
  methods: {
    
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-md rounded-r-lg p-6">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">GymMatrix</h2>
      <ul class="space-y-4">
        <li><router-link to="/" class="text-gray-700 hover:text-indigo-600">Dashboard</router-link></li>
        <li><router-link to="/customers" class="text-gray-700 hover:text-indigo-600">Customers</router-link></li>
        <li><router-link to="/memberships" class="text-gray-700 hover:text-indigo-600">Memberships</router-link></li>
        <li><router-link to="/settings" class="text-gray-700 hover:text-indigo-600">Settings</router-link></li>
      </ul>
    </div>

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
          <p class="text-2xl text-yellow-600">{{ stats.totalRevenue }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-gray-800">Total Memberships</h3>
          <p class="text-2xl text-purple-600">{{ stats.totalMemberships }}</p>
        </div>
      </div>

      <!-- Customer Management Section -->
      <div class="mt-12">
        <h2 class="text-3xl font-semibold text-white mb-6">Customer Management</h2>
        <table class="min-w-full table-auto text-gray-700 bg-white shadow-md rounded-lg overflow-hidden">
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
              <td class="px-6 py-4">{{ customer.membership }}</td>
              <td class="px-6 py-4">
                <span :class="{
                  'text-green-600': customer.status === 'Active',
                  'text-red-600': customer.status === 'Expired'
                }">{{ customer.status }}</span>
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

</style>