<template>
  <div class="p-4 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4 text-center">Manage Equipments</h2>

    <!-- Upload Form -->
    <form @submit.prevent="uploadEquipment" class="bg-white p-4 rounded shadow mb-6">
      <div class="mb-2">
        <label class="block mb-1 text-sm">Equipment Name</label>
        <input type="text" v-model="form.equipmentName" class="w-full border p-2 rounded" required />
      </div>
      <div class="mb-2">
        <label class="block mb-1 text-sm">Remarks</label>
        <input type="text" v-model="form.remarks" class="w-full border p-2 rounded" />
      </div>
      <div class="mb-2">
        <label class="block mb-1 text-sm">Photo</label>
        <input type="file" @change="handleFileChange" class="w-full" />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-full">Add Equipment</button>
    </form>

    <!-- Equipment List -->
    <div class="grid gap-4">
      <div
        v-for="item in equipments"
        :key="item.id"
        class="bg-white rounded shadow p-4 flex flex-col sm:flex-row items-center justify-between"
      >
        <div class="flex items-center gap-4">
          <img :src="imageUrl(item.equipmentPhotoLink)" class="w-20 h-20 object-cover rounded" />
          <div>
            <p class="font-semibold">{{ item.equipmentName }}</p>
            <p class="text-sm text-gray-600">{{ item.remarks }}</p>
          </div>
        </div>
        <div class="flex gap-2 mt-4 sm:mt-0">
          <button @click="startEdit(item)" class="text-sm bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
          <button @click="deleteEquipment(item.id)" class="text-sm bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editing" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">Edit Equipment</h3>
        <input type="text" v-model="editForm.equipmentName" class="w-full border p-2 rounded mb-2" />
        <input type="text" v-model="editForm.remarks" class="w-full border p-2 rounded mb-2" />
        <div class="flex justify-end gap-2">
          <button @click="editing = false" class="px-4 py-2 border rounded">Cancel</button>
          <button @click="submitEdit" class="px-4 py-2 bg-green-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axiosInstance from '@/services/axiosInstance.ts'

interface Equipment {
  id: number
  equipmentName: string
  remarks: string
  equipmentPhotoLink: string
}

interface FormDataModel {
  equipmentName: string
  remarks: string
  file: File | null
}

interface EditFormData {
  id: number | null
  equipmentName: string
  remarks: string
}

export default defineComponent({
  name: 'EquipmentManager',
  data() {
    return {
      equipments: [] as Equipment[],
      form: {
        equipmentName: '',
        remarks: '',
        file: null,
      } as FormDataModel,
      editing: false as boolean,
      editForm: {
        id: null,
        equipmentName: '',
        remarks: '',
      } as EditFormData,
    }
  },
  mounted() {
    this.fetchEquipments()
  },
  methods: {
    imageUrl(path: string): string {
      return path.startsWith('http') ? path : `http://localhost:8080/${path}`
    },
    fetchEquipments(): void {
      axiosInstance
        .get(`/equipment`)
        .then((res) => {
          this.equipments = res.data
        })
        .catch((err) => console.error(err))
    },
    handleFileChange(e: Event): void {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files && files.length > 0) {
        this.form.file = files[0]
      }
    },
    uploadEquipment(): void {
      const formData = new FormData()
      formData.append('equipmentName', this.form.equipmentName)
      formData.append('remarks', this.form.remarks)
      if (this.form.file) {
        formData.append('file', this.form.file)
      }

      axiosInstance
        .post(`/equipment`, formData)
        .then(() => {
          this.fetchEquipments()
          this.form = { equipmentName: '', remarks: '', file: null }
        })
        .catch((err) => console.error(err))
    },
    deleteEquipment(id: number): void {
      axiosInstance
        .delete(`/equipment/${id}`)
        .then(() => this.fetchEquipments())
        .catch((err) => console.error(err))
    },
    startEdit(equip: Equipment): void {
      this.editing = true
      this.editForm = {
        id: equip.id,
        equipmentName: equip.equipmentName,
        remarks: equip.remarks,
      }
    },
    submitEdit(): void {
      if (this.editForm.id !== null) {
        axiosInstance
          .put(`/equipment/${this.editForm.id}`, {
            equipmentName: this.editForm.equipmentName,
            remarks: this.editForm.remarks,
          })
          .then(() => {
            this.editing = false
            this.fetchEquipments()
          })
          .catch((err) => console.error(err))
      }
    },
  },
})
</script>

<style scoped>
@media (max-width: 640px) {
  .sm\:flex-row {
    flex-direction: column;
  }
}
</style>
