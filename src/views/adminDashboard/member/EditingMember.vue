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

interface PlanInfo {
  id: number
  price: number
  createdAt: string
  updatedAt: string
  planDuration: number
  planName: string
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
  status: string
}

export default defineComponent({
  name: 'EditingMember',
  data() {
    return {
      isReadOnly: true,
      newMembership: {
        planId: null,
        startDate: '',
        paymentType: '',
        refID: ''
      },
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
        zip: '10001'
      },
      planHistory: [] as PlanHistory[],
      planInfo: [] as PlanInfo[],
      total_active_membership: 0
    }
  },
  mounted() {
    const id = this.$route.params.member_id
    axiosInstance
      .get<PlanInfo[]>('/plan')
      .then((res) => {
        this.planInfo = res.data
        console.log('plans info:' + this.planInfo)
      })
      .catch((e) => {
        console.log('error in fetching the plans info ' + e)
      })
    axiosInstance
      .get<{
        memberInfo: MemberInfo
        planHistory: PlanHistory[]
      }>('/member/' + id)
      .then((res) => {
        this.memberInfo = res.data.memberInfo
        this.planHistory = res.data.planHistory || []
      })
      .catch((e) => {
        console.log('error in fetching the ' + e)
      })
  },
  methods: {
    createMembership() {
      const memberId = this.$route.params.member_id

      const payload = {
        planId: this.newMembership.planId,
        startDate: new Date(this.newMembership.startDate).toISOString(),
        paymentType: this.newMembership.paymentType,
        refID: this.newMembership.refID,
        userId: Number(memberId)
      }

      axiosInstance
        .post('/memberships', payload)
        .then((res) => {
          console.log(res.data)
          alert('Membership created successfully')
          this.newMembership.planId = null
          this.newMembership.startDate = ''
          this.newMembership.paymentType = ''
          this.newMembership.refID = ''
          return axiosInstance.get(`/member/${memberId}`)
        })
        .then((res) => {
          this.planHistory = res.data.planHistory
        })
        .catch((err) => {
          console.error('Error creating membership:', err)
          console.log(err.response.data.error)
          alert(err.response.data.error)
        })
    },
    handleSubmit() {
      if (this.isFormValid()) {
        axiosInstance
          .put<{
            message: string
          }>('/member/' + this.$route.params.member_id, this.memberInfo)
          .then((response) => {
            console.log(response.data)
            this.isReadOnly = false
          })
          .catch((error) => {
            console.log('Error saving member info:', error)
          })
      } else {
        alert('Please fill in all required fields')
      }
    },

    isFormValid() {
      return this.memberInfo.name && this.memberInfo.email && this.memberInfo.age
    }
  }
})
</script>

<template>
  <div class="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">Member Information</h2>
      <button
        class="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        v-if="isReadOnly"
        @click="isReadOnly = false"
      >
        Edit
      </button>
      <div class="md:col-span-2 flex gap-3 mt-4" v-else>
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
    </div>

    <!-- VIEW MODE -->
    <div v-if="isReadOnly" class="mt-4 space-y-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <!-- Create Membership Form -->
      <div class="mt-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Add Membership</h3>
        <form @submit.prevent="createMembership" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Plan</label>
            <select v-model="newMembership.planId" class="form-input w-full" required>
              <option value="" disabled>Select Plan</option>
              <option v-for="plan in planInfo" :key="plan.id" :value="plan.id">
                {{ plan.planName }} - ₹{{ plan.price }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Start Date</label
            >
            <input
              v-model="newMembership.startDate"
              type="date"
              class="form-input w-full"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Payment Type</label
            >
            <select v-model="newMembership.paymentType" class="form-input w-full" required>
              <option value="" disabled>Select Payment Type</option>
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="card">Card</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ref ID</label>
            <input v-model="newMembership.refID" type="text" class="form-input w-full" />
          </div>

          <div class="md:col-span-2">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Membership
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- EDIT MODE -->
    <form v-else @submit.prevent="handleSubmit" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input v-model="memberInfo.name" type="text" class="form-input w-full" required />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input v-model="memberInfo.email" type="email" class="form-input w-full" required />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
        <input v-model="memberInfo.phone" type="tel" class="form-input w-full" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
        <select v-model="memberInfo.gender" class="form-input w-full">
          <option value="" disabled>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
        <input v-model="memberInfo.age" type="number" class="form-input w-full" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
        <input v-model="memberInfo.address" type="text" class="form-input w-full" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
        <input v-model="memberInfo.city" type="text" class="form-input w-full" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
        <input v-model="memberInfo.state" type="text" class="form-input w-full" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
        <input v-model="memberInfo.country" type="text" class="form-input w-full" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Zip Code</label>
        <input v-model="memberInfo.zip" type="text" class="form-input w-full" />
      </div>
    </form>

    <!-- Plan History Table -->
    <div class="mt-8 overflow-x-auto" v-if="planHistory.length !== 0">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Plan Name
            </th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Amount
            </th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Payment Type
            </th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Start Date
            </th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              End Date
            </th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Collected By
            </th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Status
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
          <tr v-for="(plan, index) in planHistory" :key="index">
            <td class="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{{ plan.planName }}</td>
            <td class="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">₹{{ plan.amount }}</td>
            <td class="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 capitalize">
              {{ plan.paymentType }}
            </td>
            <td class="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
              {{ new Date(plan.startDate).toLocaleDateString() }}
            </td>
            <td class="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
              {{ new Date(plan.endDate).toLocaleDateString() }}
            </td>
            <td class="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 capitalize">
              {{ plan.collectedBy }}
            </td>
            <td class="px-4 py-2 text-sm">
              <span
                :class="{
                  'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100':
                    plan.status === 'ACTIVE',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100':
                    plan.status === 'UPCOMING',
                  'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100':
                    plan.status === 'EXPIRED',
                }"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              >
                {{
                  plan.status === 'ACTIVE'
                    ? 'Active'
                    : plan.status === 'UPCOMING'
                      ? 'Upcoming'
                      : 'Expired'
                }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
