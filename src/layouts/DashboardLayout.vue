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
    <div class="hidden md:flex md:flex-col md:h-screen">
      <Sidebar :open="true" class="flex-1" />
    </div>

    <transition name="slide">
      <div v-if="isSidebarOpen" class="fixed inset-0 z-40 flex md:hidden">
        <div class="fixed inset-0" @click="isSidebarOpen = false"></div>
        <div class="relative w-64 bg-white dark:bg-gray-900 z-50 h-screen">
          <Sidebar :open="true" @close="isSidebarOpen = false" />
        </div>
      </div>
    </transition>

    <div class="flex-1 p-4 sm:p-8 overflow-y-auto w-full">
      <button class="md:hidden mb-4 text-white focus:outline-none" @click="toggleSidebar" aria-label="Toggle sidebar">
        ☰ Menu
      </button>
      <router-view />
    </div>
  </div>
</template>



<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
