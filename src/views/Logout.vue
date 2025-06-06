<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/services/axiosInstance'
import { PushNotifications } from '@capacitor/push-notifications'

export default defineComponent({
  name: 'logout',
  setup() {
    const router = useRouter()

    const logout = async () => {
      const gymId = localStorage.getItem('gym_id')
      const userId = localStorage.getItem('user_id')
      const role = localStorage.getItem('role')
      const token = await getPushTokenFromStorage()

      try {
        if (gymId && userId && role && token) {
          await axios.delete(`/api/gym/${gymId}/${role}/${userId}/notification`, {
            data: { token }
          })
        }
      } catch (error) {
        console.warn('Failed to delete token:', error)
      }

      localStorage.clear()
      await PushNotifications.removeAllListeners()
      await PushNotifications.unregister()
      await router.push({ name: 'Login' })
    }

    const getPushTokenFromStorage = async (): Promise<string | null> => {
      return new Promise((resolve) => {
        PushNotifications.getDeliveredNotifications().then(() => {
          resolve(localStorage.getItem('fcm_token'))
        })
      })
    }

    onMounted(() => {
      logout()
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
