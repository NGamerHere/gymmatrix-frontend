<script lang="ts">
import { defineComponent } from 'vue'

interface Member {
  name: string
  email: string
  plan: string
  status: 'Active' | 'Expired'
}

export default defineComponent({
  name: 'ManageMembersView',
  data() {
    return {
      members: [] as Member[],
      newMember: {
        name: '',
        email: '',
        plan: '',
        status: 'Active' as 'Active' | 'Expired',
      },
      showForm: false,
    }
  },
  methods: {
    addMember() {
      this.members.push({ ...this.newMember })
      this.newMember = { name: '', email: '', plan: '', status: 'Active' }
      this.showForm = false
    },
    deleteMember(index: number) {
      this.members.splice(index, 1)
    },
  },
})
</script>

<template>
  <div class="text-gray-800">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">Manage Members</h1>
      <button
        @click="showForm = !showForm"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
      >
        {{ showForm ? 'Close Form' : 'Add Member' }}
      </button>
    </div>

    <!-- Add Member Form -->
    <div v-if="showForm" class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Add New Member</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="newMember.name"
          type="text"
          placeholder="Full Name"
          class="border border-gray-300 p-3 rounded"
        />
        <input
          v-model="newMember.email"
          type="email"
          placeholder="Email"
          class="border border-gray-300 p-3 rounded"
        />
        <input
          v-model="newMember.plan"
          type="text"
          placeholder="Membership Plan"
          class="border border-gray-300 p-3 rounded"
        />
        <select
          v-model="newMember.status"
          class="border border-gray-300 p-3 rounded"
        >
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>
      </div>
      <button
        @click="addMember"
        class="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
      >
        Save Member
      </button>
    </div>

    <!-- Members Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="min-w-full table-auto text-left">
        <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3">Name</th>
          <th class="px-6 py-3">Email</th>
          <th class="px-6 py-3">Plan</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(member, index) in members"
          :key="index"
          class="border-t border-gray-200"
        >
          <td class="px-6 py-4">{{ member.name }}</td>
          <td class="px-6 py-4">{{ member.email }}</td>
          <td class="px-6 py-4">{{ member.plan }}</td>
          <td class="px-6 py-4">
              <span
                :class="{
                  'text-green-600': member.status === 'Active',
                  'text-red-600': member.status === 'Expired',
                }"
              >
                {{ member.status }}
              </span>
          </td>
          <td class="px-6 py-4">
            <button
              @click="deleteMember(index)"
              class="text-red-600 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="members.length === 0">
          <td colspan="5" class="px-6 py-4 text-center text-gray-500">
            No members found.
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
h1,
h2 {
  color: white;
}
</style>
