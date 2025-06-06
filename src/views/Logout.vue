<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PushNotifications } from '@capacitor/push-notifications'

export default defineComponent({
  name: 'Logout',
  setup() {
    const router = useRouter()

    onMounted(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('gym_id')
      localStorage.removeItem("user_id");
      localStorage.removeItem("role");
      PushNotifications.removeAllListeners()
      PushNotifications.unregister()
      router.push({ name: 'Login' })
    })

    return {}
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <div class="text-xl font-semibold text-gray-700">Logging you out...</div>
      <div class="text-sm text-gray-500 mt-2">Please wait.</div>
    </div>
  </div>
</template>
