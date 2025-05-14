<script lang="ts">
import { defineComponent } from 'vue'
import axiosInstance from '@/services/axiosInstance.ts'

interface MemberInfo {
  name: string
  email: string
  phone: string
  gender: string
  age: number
  address: string
  city: string
  state: string
  country: string
  zip: string
}

interface PlanHistory {
  active: boolean
  endDate: string
  planName: string
  startDate: string
  paymentType: string
  amount: number
  collectedBy: string
  paymentDoneOn: string
}

export default defineComponent({
  name: 'EditingMember',
  data() {
    return {
      isReadOnly: true,
      memberInfo: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '1234567890',
        gender: 'Female',
        age: 28,
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zip: '10001',
      },
      planHistory: [] as PlanHistory[],
    }
  },
  mounted(){
     const id=this.$route.params.member_id;
     axiosInstance.get<{
       memberInfo:MemberInfo,
       planHistory:PlanHistory[]
     }>("/member/"+id).then((res)=>{
       this.memberInfo = res.data.memberInfo
       this.planHistory = res.data.planHistory || [];
     }).catch((e)=>{
       console.log('error in fetching the '+e);
     })
  },methods: {
    handleSubmit() {
      if (this.isFormValid()) {
        axiosInstance.put<{
          message:string
        }>("/member/" + this.$route.params.member_id, this.memberInfo)
          .then(response => {
            console.log(response.data);
            this.isReadOnly=false;
          })
          .catch(error => {
            console.log('Error saving member info:', error);
          });
      } else {
        alert('Please fill in all required fields');
      }
    },

    isFormValid() {
      return this.memberInfo.name && this.memberInfo.email && this.memberInfo.age;
    }
  }

})
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
    <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Member Information</h2>

    <!-- VIEW MODE -->
    <div v-if="isReadOnly" class="space-y-3">
      <div class="flex justify-around flex-row">
        <div>
          <p><strong>Name:</strong> {{ memberInfo.name }}</p>
          <p><strong>Email:</strong> {{ memberInfo.email }}</p>
          <p><strong>Phone:</strong> {{ memberInfo.phone }}</p>
          <p><strong>Gender:</strong> {{ memberInfo.gender }}</p>
          <p><strong>Age:</strong> {{ memberInfo.age }}</p>
        </div>
        <div>
          <p><strong>Address:</strong> {{ memberInfo.address }}</p>
          <p><strong>City:</strong> {{ memberInfo.city }}</p>
          <p><strong>State:</strong> {{ memberInfo.state }}</p>
          <p><strong>Country:</strong> {{ memberInfo.country }}</p>
          <p><strong>Zip Code:</strong> {{ memberInfo.zip }}</p>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="isReadOnly = false"
        >
          Edit
        </button>
      </div>
    </div>

    <!-- EDIT MODE -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input v-model="memberInfo.name" type="text" class="form-input" required />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input v-model="memberInfo.email" type="email" class="form-input" required />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
        <input v-model="memberInfo.phone" type="tel" class="form-input" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
        <select v-model="memberInfo.gender" class="form-input">
          <option value="" disabled>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
        <input v-model="memberInfo.age" type="number" class="form-input" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
        <input v-model="memberInfo.address" type="text" class="form-input" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
        <input v-model="memberInfo.city" type="text" class="form-input" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
        <input v-model="memberInfo.state" type="text" class="form-input" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
        <input v-model="memberInfo.country" type="text" class="form-input" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Zip Code</label>
        <input v-model="memberInfo.zip" type="text" class="form-input" />
      </div>

      <div class="flex gap-3 mt-4">
        <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Save
        </button>
        <button
          type="button"
          @click="isReadOnly = true"
          class="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  background-color: white;
  color: #1a202c;
}
.dark .form-input {
  background-color: #374151;
  border-color: #4b5563;
  color: #d1d5db;
}
</style>
