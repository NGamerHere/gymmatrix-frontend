<!-- Popup.vue -->
<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop overlay -->
    <div
      class="absolute inset-0 popup-container"
      @click="closeOnBackdropClick ? close() : null"
    ></div>

    <!-- Popup container -->
    <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4 z-10">
      <!-- Header with title and close button -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
        <button
          @click="close"
          class="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="text-gray-700">
        <slot></slot>
      </div>

      <!-- Footer with action buttons -->
      <div v-if="showFooter" class="mt-6 flex justify-end space-x-2">
        <button
          v-if="showCancelButton"
          @click="close"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {{ cancelButtonText }}
        </button>
        <button
          v-if="showConfirmButton"
          @click="confirm"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ confirmButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" >
export default {
  name: 'BasePopup',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Popup Title'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    cancelButtonText: {
      type: String,
      default: 'Cancel'
    },
    confirmButtonText: {
      type: String,
      default: 'Confirm'
    },
    closeOnBackdropClick: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close', 'confirm'],
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>
<style>
  .popup-container{
      background-color: gray;
      opacity: 0.5;
  }
</style>
