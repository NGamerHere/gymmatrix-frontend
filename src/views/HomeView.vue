<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LandingPageView',
  data: () => ({
    name: '',
    email: '',
    gymName: '',
    message: '',
    enquirySubmitted: false,
  }),
  mounted() {
    const token = localStorage.getItem('token');
    if(token){
       this.$router.push("/dashboard");
    }
  },
  methods: {
    submitEnquiry() {
      console.log({
        name: this.name,
        email: this.email,
        gymName: this.gymName,
        message: this.message,
      })
      this.enquirySubmitted = true
      this.name = ''
      this.email = ''
      this.gymName = ''
      this.message = ''
    },
  },
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
    <!-- Hero Section -->
    <!-- Hero Section -->
    <section class="flex flex-col items-center justify-center text-center py-24 px-6">
      <h1 class="text-5xl font-bold mb-4">Transform Your Gym Management with GymMatrix</h1>
      <p class="text-lg max-w-2xl mb-8">
        Manage customers, memberships, attendance, and track revenues — all in one beautiful
        platform tailored for gym owners.
      </p>
      <div class="flex gap-4 flex-col sm:flex-row">
        <router-link
          to="#enquiry"
          class="bg-white text-indigo-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition"
        >
          Enquire Now
        </router-link>
        <router-link
          to="/login"
          class="bg-transparent border border-white text-white font-bold py-3 px-6 rounded-xl hover:bg-white hover:text-indigo-600 transition"
        >
          Login
        </router-link>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-6 bg-white text-gray-800">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">Our Powerful Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-indigo-100 p-6 rounded-xl shadow-md text-center">
            <h3 class="text-xl font-semibold mb-4">Customer Management</h3>
            <p>View, add, edit, and manage all your gym customers with ease.</p>
          </div>
          <div class="bg-purple-100 p-6 rounded-xl shadow-md text-center">
            <h3 class="text-xl font-semibold mb-4">Membership Plans</h3>
            <p>Create, customize, and assign membership plans effortlessly.</p>
          </div>
          <div class="bg-pink-100 p-6 rounded-xl shadow-md text-center">
            <h3 class="text-xl font-semibold mb-4">Attendance Tracking</h3>
            <p>Monitor daily attendance of members and get actionable insights.</p>
          </div>
          <div class="bg-yellow-100 p-6 rounded-xl shadow-md text-center">
            <h3 class="text-xl font-semibold mb-4">Revenue Reports</h3>
            <p>View revenue trends, pending payments, and financial stats easily.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Enquiry Form Section -->
    <section
      id="enquiry"
      class="py-20 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    >
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">Enquire Now</h2>

        <div
          v-if="enquirySubmitted"
          class="bg-green-100 text-green-800 p-4 rounded-xl mb-6 text-center"
        >
          Thank you! We will get back to you shortly.
        </div>

        <form @submit.prevent="submitEnquiry" class="space-y-6">
          <input
            type="text"
            v-model="name"
            placeholder="Your Name"
            required
            class="w-full p-4 rounded-lg text-gray-700 focus:outline-none"
          />
          <input
            type="email"
            v-model="email"
            placeholder="Your Email"
            required
            class="w-full p-4 rounded-lg text-gray-700 focus:outline-none"
          />
          <input
            type="text"
            v-model="gymName"
            placeholder="Gym Name"
            required
            class="w-full p-4 rounded-lg text-gray-700 focus:outline-none"
          />
          <textarea
            v-model="message"
            placeholder="Your Message"
            rows="4"
            required
            class="w-full p-4 rounded-lg text-gray-700 focus:outline-none"
          ></textarea>

          <button
            type="submit"
            class="w-full bg-white text-indigo-600 font-bold py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Submit Enquiry
          </button>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-6 text-center text-sm text-gray-200">
      &copy; 2025 GymMatrix. All Rights Reserved.
    </footer>
  </div>
</template>

<style scoped>
/* Optional minor styles */
input,
textarea {
  background-color: #f9fafb;
}
</style>
