<script lang="ts">
import { defineComponent } from 'vue'
import axiosInstance from '@/services/axiosInstance.ts'

interface Exercise {
  orderIndex: number
  reps: number
  restSeconds: number
  equipmentName: string
  equipmentId: number
  exerciseName: string
  sets: number
}

interface Routine {
  routineId: number
  routineName: string
  exercises: Exercise[]
}

export default defineComponent({
  name: 'WorkoutManagementView',
  data() {
    return {
      workoutRoutines: [] as Routine[],
      expandedRoutines: {} as Record<number, boolean>
    }
  },
  methods: {
    fetchWorkoutRoutines() {
      axiosInstance
        .get<Routine[]>('/workout-routines')
        .then((res) => {
          this.workoutRoutines = res.data
        })
        .catch((error) => {
          console.error('Error in fetching the workout routines :' + error)
        })
    },
    toggleRoutine(index: number) {
      this.expandedRoutines[index] = !this.expandedRoutines[index]
    }
  },
  mounted() {
    this.fetchWorkoutRoutines();
  },
})
</script>

<template>
  <div class="bg-white px-3 py-3">
    <div class="flex items-center justify-between px-3 py-1">
      <h1 class="text-lg font-bold sm:text-xl md:text-2xl">Workout Management</h1>

      <button
        class="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded text-sm sm:text-base hover:bg-blue-600 transition"
        @click="$router.push('add')"
      >
        <svg
          class="h-5 w-5 sm:hidden"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span class="hidden sm:inline">Add new workout-routines</span>
      </button>
    </div>

    <div class="mt-3">
      <div class="border rounded-md shadow-md p-4" v-for="(item, index) in workoutRoutines" :key="index">
        <!-- Routine Header with Toggle Button -->
        <div class="flex justify-between items-center cursor-pointer" @click="toggleRoutine(index)">
          <h1 class="font-bold text-xl">{{ item.routineName }}</h1>
          <button class="p-1 hover:bg-gray-100 rounded transition-colors">
            <svg
              :class="{ 'rotate-180': expandedRoutines[index] }"
              class="w-5 h-5 transform transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>

        <!-- Collapsible Exercise Content -->
        <div v-show="expandedRoutines[index]" class="mt-3">
          <h2 class="font-semibold text-lg mb-2">Exercises</h2>

          <div class="space-y-3">
            <div
              v-for="(exercise, exerciseIndex) in item.exercises"
              :key="exerciseIndex"
              class="bg-gray-50 p-3 rounded border-l-4 border-blue-500"
            >
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-medium text-lg">{{ exercise.orderIndex }}. {{ exercise.exerciseName }}</h3>
                <span class="text-sm text-gray-600">{{ exercise.equipmentName }}</span>
              </div>

              <div class="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span class="font-medium">Sets:</span> {{ exercise.sets }}
                </div>
                <div>
                  <span class="font-medium">Reps:</span> {{ exercise.reps }}
                </div>
                <div>
                  <span class="font-medium">Rest:</span> {{ exercise.restSeconds }}s
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
