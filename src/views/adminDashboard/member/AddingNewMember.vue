<script lang="ts">
import { defineComponent } from 'vue';
import axiosInstance from '@/services/axiosInstance.ts'

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
      zip: ''
    };
  },
  methods: {
    handleSubmit() {

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
      });
      axiosInstance.post<{
        message:string,
        id:number
      }>("/member",{
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
      },(res)=>{
          console.log(res.data);
      }).catch((e)=>{
          console.error("unable to add the error : "+e);
      });

    },
  },
});
</script>

<template>
  <form class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
    <h2 class="text-xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-6">
      Member Information
    </h2>

    <!-- Name -->
    <div class="mb-4">
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2" for="name">
        Name
      </label>
      <input
        v-model="name"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        id="name"
        type="text"
        placeholder="Enter your full name"
        required
      />
    </div>

    <!-- Email -->
    <div class="mb-4">
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2" for="email">
        Email
      </label>
      <input
        v-model="email"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        id="email"
        type="email"
        placeholder="Enter your email address"
        required
      />
    </div>

    <!-- Phone -->
    <div class="mb-4">
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2" for="phone">
        Phone
      </label>
      <input
        v-model="phone"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        id="phone"
        type="tel"
        placeholder="Enter your phone number"
      />
    </div>

    <!-- Gender -->
    <div class="mb-4">
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2" for="gender">
        Gender
      </label>
      <select
        v-model="gender"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        id="gender"
      >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <!-- Age -->
    <div class="mb-4">
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2" for="age">
        Age
      </label>
      <input
        v-model="age"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        id="age"
        type="number"
        placeholder="Enter your age"
      />
    </div>

    <!-- Address -->
    <div class="mb-4">
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2" for="address">
        Address
      </label>
      <input
        v-model="address"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        id="address"
        type="text"
        placeholder="Enter your address"
      />
    </div>

    <!-- City -->
    <div class="mb-4">
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2" for="city">
        City
      </label>
      <input
        v-model="city"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        id="city"
        type="text"
        placeholder="Enter your city"
      />
    </div>

    <!-- State -->
    <div class="mb-4">
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2" for="state">
        State
      </label>
      <input
        v-model="state"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        id="state"
        type="text"
        placeholder="Enter your state"
      />
    </div>

    <!-- Country -->
    <div class="mb-4">
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2" for="country">
        Country
      </label>
      <input
        v-model="country"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        id="country"
        type="text"
        placeholder="Enter your country"
      />
    </div>

    <!-- Zip Code -->
    <div class="mb-4">
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2" for="zip">
        Zip Code
      </label>
      <input
        v-model="zip"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        id="zip"
        type="text"
        placeholder="Enter your zip code"
      />
    </div>

    <!-- Password -->
    <div class="mb-6">
      <label class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2" for="password">
        Password
      </label>
      <input
        v-model="password"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        id="password"
        type="password"
        placeholder="Enter your password"
        autocomplete="new-password"
      />
    </div>

    <div class="flex justify-center">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        type="submit"
        @click.prevent="handleSubmit"
      >
        Submit
      </button>
    </div>
  </form>
</template>


<style scoped></style>
