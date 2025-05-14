<script lang="ts">
import { defineComponent, ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

export default defineComponent({
  name: 'DashboardLayout',
  components: {
    Sidebar
  },
  setup() {
    const isSidebarOpen = ref(false)
    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value
    }

    return {
      isSidebarOpen,
      toggleSidebar
    }
  }
})
</script>

<template>
  <div class="min-h-screen flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <Sidebar :open="isSidebarOpen" @close="isSidebarOpen = false" />
    <div class="flex-1 p-4 sm:p-8 overflow-y-auto">
      <button
        class="md:hidden mb-4 text-white"
        @click="toggleSidebar"
        aria-label="Toggle sidebar"
      >
        ☰ Menu
      </button>
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
