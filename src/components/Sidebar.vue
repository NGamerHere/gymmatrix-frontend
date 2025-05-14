<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close']
})
</script>

<template>
  <nav
    class="fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white dark:bg-gray-900 shadow-md p-6 z-50 transform transition-transform duration-300 ease-in-out"
    :class="open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    aria-label="Sidebar Navigation"
  >
    <div class="flex justify-between items-center mb-6 md:hidden">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">GymMatrix</h2>
      <button @click="$emit('close')" class="text-gray-600 dark:text-gray-300" aria-label="Close sidebar">✕</button>
    </div>

    <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 hidden md:block">GymMatrix</h2>

    <ul class="space-y-4">
      <li>
        <router-link
          to="/dashboard/customers"
          class="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          active-class="font-semibold text-indigo-700 dark:text-indigo-400"
        >
          Customers
        </router-link>
      </li>
      <li>
        <router-link
          to="/dashboard/memberships"
          class="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          active-class="font-semibold text-indigo-700 dark:text-indigo-400"
        >
          Memberships
        </router-link>
      </li>
      <li>
        <router-link
          to="/dashboard/settings"
          class="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          active-class="font-semibold text-indigo-700 dark:text-indigo-400"
        >
          Settings
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* Sidebar overlay background for mobile could be added if needed */
</style>
