<template>
  <div class="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-12 xl:px-20">
    <div class="mx-auto w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-blue-600 px-6 py-4">
        <h2 class="text-xl font-bold text-white">Add Workout Routine</h2>
      </div>

      <form @submit.prevent="submitForm" class="p-6 space-y-6">
        <!-- Routine Type Toggle -->
        <div class="space-y-3">
          <label class="text-sm font-medium text-gray-700">Routine Type</label>
          <div class="flex rounded-md bg-gray-100 p-1">
            <button
              type="button"
              @click="isTemplate = true"
              :class="[
                'flex-1 py-2 px-4 text-sm font-medium rounded transition-colors',
                isTemplate
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800',
              ]"
            >
              Template
            </button>
            <button
              type="button"
              @click="isTemplate = false"
              :class="[
                'flex-1 py-2 px-4 text-sm font-medium rounded transition-colors',
                !isTemplate
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800',
              ]"
            >
              Assign to Member
            </button>
          </div>
        </div>

        <!-- Template Selection (when assigning to member) -->
        <div v-if="!isTemplate" class="space-y-2">
          <label for="routineId" class="block text-sm font-medium text-gray-700">
            Select Template <span class="text-red-500">*</span>
          </label>
          <select
            id="routineId"
            v-model="form.routineId"
            @change="handleTemplateChange($event)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a template...</option>
            <option
              v-for="template in templates"
              :key="template.routineId"
              :value="template.routineId"
            >
              {{ template.routineName }}
            </option>
          </select>
        </div>

        <!-- Common Fields for both modes -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="routineName" class="block text-sm font-medium text-gray-700">
              Routine Name <span class="text-red-500">*</span>
            </label>
            <input
              id="routineName"
              v-model="form.routineName"
              type="text"
              placeholder="Enter routine name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div v-if="!isTemplate" class="space-y-2">
            <label for="dayOfWeek" class="block text-sm font-medium text-gray-700">
              Day of Week <span class="text-red-500">*</span>
            </label>
            <select
              id="dayOfWeek"
              v-model="form.dayOfWeek"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select day...</option>
              <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>
            </select>
          </div>
        </div>

        <div class="space-y-2">
          <label for="description" class="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            placeholder="Enter routine description..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        <!-- Member Selection (when assigning to member) -->
        <div v-if="!isTemplate" class="space-y-2">
          <label for="memberId" class="block text-sm font-medium text-gray-700">
            Select Member <span class="text-red-500">*</span>
          </label>
          <select
            id="memberId"
            v-model="form.memberId"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a member...</option>
            <option v-for="member in members" :key="member.id" :value="member.id">
              {{ member.name }}
            </option>
          </select>
        </div>

        <!-- Exercises Section -->
        <div v-if="!isTemplate" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Exercises</h3>
            <button
              type="button"
              @click="addExercise"
              class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              Add Exercise
            </button>
          </div>

          <!-- Exercise List -->
          <div v-if="form.newWorkoutRoutines.length > 0" class="space-y-4">
            <div
              v-for="(exercise, index) in form.newWorkoutRoutines"
              :key="index"
              class="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-gray-700">Exercise {{ index + 1 }}</span>
                <div class="flex items-center space-x-2">
                  <!-- Move Up -->
                  <button
                    type="button"
                    @click="moveExercise(index, 'up')"
                    :disabled="index === 0"
                    class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      ></path>
                    </svg>
                  </button>
                  <!-- Move Down -->
                  <button
                    type="button"
                    @click="moveExercise(index, 'down')"
                    :disabled="index === form.newWorkoutRoutines.length - 1"
                    class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  <!-- Remove -->
                  <button
                    type="button"
                    @click="removeExercise(index)"
                    class="p-1 text-red-400 hover:text-red-600"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Exercise Name</label>
                  <input
                    v-model="exercise.exerciseName"
                    type="text"
                    placeholder="Enter exercise name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Equipment</label>
                  <select
                    v-model="exercise.equipmentId"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select equipment...</option>
                    <option
                      v-for="equipment in equipments"
                      :key="equipment.id"
                      :value="equipment.id"
                    >
                      {{ equipment.equipmentName }}
                    </option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Sets</label>
                  <input
                    v-model.number="exercise.sets"
                    type="number"
                    min="1"
                    placeholder="Sets"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Reps</label>
                  <input
                    v-model.number="exercise.reps"
                    type="number"
                    min="1"
                    placeholder="Reps"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div class="space-y-2 md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Rest (seconds)</label>
                  <input
                    v-model.number="exercise.restSeconds"
                    type="number"
                    min="0"
                    placeholder="Rest time in seconds"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-500">
            <p>No exercises added yet. Click "Add Exercise" to get started.</p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3">
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="success" class="bg-green-50 border border-green-200 rounded-md p-3">
          <p class="text-sm text-green-700">{{ success }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
          <span v-else>
            {{ isTemplate ? 'Create Template' : 'Create Routine' }}
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from '@/services/axiosInstance.ts'
import type { Exercise } from '@/types/Exercise.ts'
import type { Equipment } from '@/types/Equipment.ts'

// Types
interface Template {
  routineId: number
  routineName: string
  description: string
  exercises: Exercise[]
}

interface Member {
  id: number
  name: string
}

interface WorkoutRoutineForm {
  routineName: string
  description: string
  isTemplate: boolean
  routineId: number | string
  memberId: number | string
  dayOfWeek: string
  newWorkoutRoutines: Exercise[]
}

export default defineComponent({
  name: 'WorkoutRoutineForm',
  data() {
    return {
      isTemplate: true,
      loading: false,
      error: '',
      success: '',

      form: {
        isTemplate:true,
        routineName: '',
        description: '',
        routineId: '',
        memberId: '',
        dayOfWeek: '',
        newWorkoutRoutines: [],
      } as WorkoutRoutineForm,

      templates: [] as Template[],
      members: [] as Member[],
      equipments: [] as Equipment[],
    }
  },
  watch: {
    isTemplate() {
      this.resetForm()
    },
  },

  mounted() {
    this.loadTemplates()
    this.loadMembers()
    this.loadEquipments()
  },

  methods: {
    handleTemplateChange(event: Event) {
      const selectedId = Number((event.target as HTMLSelectElement).value)
      const selectedTemplate = this.templates.find((t) => t.routineId === selectedId)

      if (selectedTemplate) {
        this.form.routineName = selectedTemplate.routineName
        this.form.description = selectedTemplate.description
        this.form.newWorkoutRoutines = selectedTemplate.exercises
          ? [...selectedTemplate.exercises]
          : []
      } else {
        console.warn('Template not found for id:', selectedId)
      }
    },
    resetForm() {
      this.form = {
        routineName: '',
        description: '',
        routineId: '',
        memberId: '',
        dayOfWeek: '',
        newWorkoutRoutines: [],
      }
      this.error = ''
      this.success = ''
    },

    addExercise() {
      const newExercise: Exercise = {
        exerciseName: '',
        sets: 3,
        reps: 10,
        restSeconds: 60,
        orderIndex: this.form.newWorkoutRoutines.length + 1,
        equipmentId: '',
      }
      this.form.newWorkoutRoutines.push(newExercise)
    },

    removeExercise(index: number) {
      this.form.newWorkoutRoutines.splice(index, 1)
      this.updateOrderIndices()
    },

    moveExercise(index: number, direction: 'up' | 'down') {
      const exercises = this.form.newWorkoutRoutines
      const newIndex = direction === 'up' ? index - 1 : index + 1

      if (newIndex >= 0 && newIndex < exercises.length) {
        // Swap exercises
        const temp = exercises[index]
        exercises[index] = exercises[newIndex]
        exercises[newIndex] = temp

        this.updateOrderIndices()
      }
    },

    updateOrderIndices() {
      this.form.newWorkoutRoutines.forEach((exercise, index) => {
        exercise.orderIndex = index + 1
      })
    },

    validateForm(): boolean {
      if (!this.form.routineName.trim()) {
        this.error = 'Routine name is required'
        return false
      }

      if (!this.isTemplate) {
        if (!this.form.routineId) {
          this.error = 'Please select a template'
          return false
        }
        if (!this.form.memberId) {
          this.error = 'Please select a member'
          return false
        }
        if (!this.form.dayOfWeek) {
          this.error = 'Please select a day of the week'
          return false
        }

        // Validate exercises
        if (this.form.newWorkoutRoutines.length === 0) {
          this.error = 'Please add at least one exercise'
          return false
        }

        for (let i = 0; i < this.form.newWorkoutRoutines.length; i++) {
          const exercise = this.form.newWorkoutRoutines[i]
          if (!exercise.exerciseName.trim()) {
            this.error = `Exercise ${i + 1}: Exercise name is required`
            return false
          }
          if (!exercise.sets || exercise.sets <= 0) {
            this.error = `Exercise ${i + 1}: Sets must be greater than 0`
            return false
          }
          if (!exercise.reps || exercise.reps <= 0) {
            this.error = `Exercise ${i + 1}: Reps must be greater than 0`
            return false
          }
          if (!exercise.equipmentId) {
            this.error = `Exercise ${i + 1}: Please select equipment`
            return false
          }
        }
      }
      return true
    },

    async submitForm() {
      this.error = ''
      this.success = ''

      if (!this.validateForm()) return

      this.loading = true

      try {
        const payload = {
          routineName: this.form.routineName,
          description: this.form.description,
          isTemplate: this.isTemplate,
          ...(this.isTemplate
            ? {}
            : {
                routineId: Number(this.form.routineId),
                memberId: Number(this.form.memberId),
                dayOfWeek: this.form.dayOfWeek,
                newWorkoutRoutines: this.form.newWorkoutRoutines.map((exercise) => ({
                  ...exercise,
                  equipmentId: Number(exercise.equipmentId),
                })),
              }),
        }

        const response = await axios.post('/workout-routine', payload)

        this.success = response.data.message
        this.resetForm()
      } catch (err: any) {
        if (err.response && err.response.data) {
          this.error = err.response.data.error || 'An error occurred'
        } else {
          this.error = 'Network error. Please try again.'
        }
        console.error('API Error:', err)
      } finally {
        this.loading = false
      }
    },

    // Load templates from API
    async loadTemplates() {
      try {
        const response = await axios.get('/workout-routines')
        this.templates = response.data
      } catch (err) {
        console.error('Error loading templates:', err)
      }
    },

    // Load members from API
    async loadMembers() {
      try {
        const response = await axios.get('/member')
        this.members = response.data
      } catch (err) {
        console.error('Error loading members:', err)
      }
    },

    // Load equipments from API
    async loadEquipments() {
      try {
        const response = await axios.get('/equipment')
        this.equipments = response.data
      } catch (err) {
        console.error('Error loading equipments:', err)
      }
    },
  },
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
