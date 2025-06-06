<script lang="ts">
import { defineComponent } from 'vue'
import axiosInstance from '@/services/axiosInstance.ts'

interface Plan {
  id: number
  price: number
  createdAt: string
  updatedAt: string
  planName: string
  planDuration: number
}

export default defineComponent({
  name: 'PlansManagment',
  data() {
    return {
      error: '' as string,
      plans: [] as Plan[],
      showModal: false,
      isEdit: false,
      currentPlan: {
        id: 0,
        price: 0,
        planName: '',
        planDuration: 0,
        createdAt: '',
        updatedAt: '',
      } as Plan,
    }
  },
  created() {
    this.fetchPlans()
  },
  methods: {
    fetchPlans() {
      axiosInstance
        .get<Plan[]>('/plan')
        .then((res) => {
          this.plans = res.data
        })
        .catch((e) => {
          this.error = 'Failed to fetch plans'
          console.error('Error fetching the info: ' + e)
        })
    },
    openAddModal() {
      this.isEdit = false
      this.showModal = true
      this.currentPlan = {
        id: 0,
        price: 0,
        planName: '',
        planDuration: 0,
        createdAt: '',
        updatedAt: '',
      }
    },
    openEditModal(plan: Plan) {
      this.isEdit = true
      this.showModal = true
      this.currentPlan = { ...plan }
    },
    savePlan() {
      if (this.isEdit) {
        const form = {
          plan_name: this.currentPlan.planName,
          plan_duration: this.currentPlan.planDuration,
          price: this.currentPlan.price,
        }
        axiosInstance.put(`/plan/${this.currentPlan.id}`, form).then(() => {
          this.fetchPlans()
          this.showModal = false
        })
      } else {
        const form = {
          plan_name: this.currentPlan.planName,
          plan_duration: this.currentPlan.planDuration,
          price: this.currentPlan.price,
        }
        axiosInstance.post('/plan', form).then(() => {
          this.fetchPlans()
          this.showModal = false
        })
      }
    },
    deletePlan(planId: number) {
      if (confirm('Are you sure you want to delete this plan?')) {
        axiosInstance.delete(`/plan/${planId}`).then(() => {
          this.fetchPlans()
        })
      }
    },
  },
})
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Plan Management</h1>
      <button
        @click="openAddModal"
        class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
      >
        Add Plan
      </button>
    </div>

    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

    <div v-if="plans.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="plan in plans"
        :key="plan.id"
        class="bg-white shadow rounded-2xl p-6 border hover:shadow-lg transition-all relative"
      >
        <h2 class="text-xl font-semibold text-blue-700 mb-2">{{ plan.planName }}</h2>
        <p class="text-gray-700">
          Duration: <span class="font-medium">{{ plan.planDuration }}</span> months
        </p>
        <p class="text-gray-700">
          Price: ₹<span class="font-medium">{{ plan.price }}</span>
        </p>
        <p class="text-sm text-gray-500 mt-2">
          Created: {{ new Date(plan.createdAt).toLocaleDateString() }}
        </p>
        <p class="text-sm text-gray-500">
          Updated: {{ new Date(plan.updatedAt).toLocaleDateString() }}
        </p>

        <div class="mt-4 flex gap-3">
          <button
            @click="openEditModal(plan)"
            class="text-sm px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            Edit
          </button>
          <!--          <button @click="deletePlan(plan.id)" class="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>-->
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500">No plans available.</div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Edit Plan' : 'Add Plan' }}</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Plan Name</label>
            <input
              v-model="currentPlan.planName"
              type="text"
              class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Duration (months)</label>
            <input
              v-model.number="currentPlan.planDuration"
              type="number"
              class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              v-model.number="currentPlan.price"
              type="number"
              class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="showModal = false"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            @click="savePlan"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
