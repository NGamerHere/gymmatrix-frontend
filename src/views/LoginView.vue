<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'LoginView',
  mounted() {
    console.log('Component mounted.')
  },
  data: () => ({
    email: '',
    password: '',
    remember: false,
    error: '',
  }),
  methods: {
    loginHandler() {
      axios.post("http://localhost:8080/api/auth/signin", {
        email: this.email,
        password: this.password,
        role:'admin'
      },{
        withCredentials: true
      }).then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("gym_id", response.data.gym_id);
        localStorage.setItem("user_id",response.data.user_id);
        localStorage.setItem("role", response.data.role);
        this.$router.push({ name: 'DashboardHome' });
      }).catch((error) => {
        console.log(error);
      });
    }
  }
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4"
  >
    <div class="w-full max-w-sm bg-white shadow-2xl rounded-2xl p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
      <form>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium mb-2"> Email </label>
          <input
            id="email"
            type="text"
            v-model="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-medium mb-2"> Password </label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div class="flex items-center justify-between mb-6">
          <label class="flex items-center space-x-2 text-sm text-gray-600">
            <input type="checkbox" class="form-checkbox" v-model="remember" />
            <span>Remember me</span>
          </label>
          <a href="#"   class="text-sm text-indigo-500 hover:underline">Forgot Password?</a>
        </div>

        <button
          type="button"
          @click="loginHandler()"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Sign In
        </button>
      </form>

      <p class="mt-6 text-center text-gray-500 text-sm">
        &copy; 2025 GymMatrix. All rights reserved.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
