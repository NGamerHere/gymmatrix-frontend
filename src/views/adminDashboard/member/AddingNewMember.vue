<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddingNewMember',
  data() {
    return {
      name: '',
      password: '',
      email: '',
      phone: '',
      gender: '',
      age: null,
      address: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      gymId: null,
    };
  },
  mounted() {

  },
  methods: {
    handleSubmit() {
      // In a real application, you would send this data to your backend
      console.log('Form Data:', {
        name: this.name,
        password: this.password,
        email: this.email,
        phone: this.phone,
        gender: this.gender,
        age: this.age,
        address: this.address,
        city: this.city,
        state: this.state,
        country: this.country,
        zip: this.zip,
        gymId: this.gymId,
      });
      // You would typically use axios or fetch here to make an API call
      // Example:
      // axios.post('/api/members', { ...this.$data }).then(response => {
      //   // Handle success (e.g., show a message, redirect)
      // }).catch(error => {
      //   // Handle error (e.g., show an error message)
      // });
    },
  },
});
</script>

<template>
  <form class="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
    <h2 class="block text-gray-700 dark:text-gray-200 text-xl font-bold mb-6">
      Member Information
    </h2>

    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" for="name">
        Name
      </label>
      <input
        v-model="name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
        id="name"
        type="text"
        placeholder="Enter your full name"
        required
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input
        v-model="email"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
        id="email"
        type="email"
        placeholder="Enter your email address"
        required
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" for="phone">
        Phone
      </label>
      <input
        v-model="phone"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
        id="phone"
        type="tel"
        placeholder="Enter your phone number"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" for="gender">
        Gender
      </label>
      <select
        v-model="gender"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
        id="gender"
      >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" for="age">
        Age
      </label>
      <input
        v-model="age"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
        id="age"
        type="number"
        placeholder="Enter your age"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" for="address">
        Address
      </label>
      <input
        v-model="address"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
        id="address"
        type="text"
        placeholder="Enter your address"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" for="city">
        City
      </label>
      <input
        v-model="city"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
        id="city"
        type="text"
        placeholder="Enter your city"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" for="state">
        State
      </label>
      <input
        v-model="state"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
        id="state"
        type="text"
        placeholder="Enter your state"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" for="country">
        Country
      </label>
      <input
        v-model="country"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
        id="country"
        type="text"
        placeholder="Enter your country"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" for="zip">
        Zip Code
      </label>
      <input
        v-model="zip"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
        id="zip"
        type="text"
        placeholder="Enter your zip code"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input
        v-model="password"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
        id="password"
        type="password"
        placeholder="Enter your password"
        autocomplete="new-password"
      />
    </div>

    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        @click.prevent="handleSubmit"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<style scoped></style>
