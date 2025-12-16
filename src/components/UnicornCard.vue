<template>
  <div class="bg-white rounded-lg p-3 sm:p-6 mb-4 border-l-4 shadow-sm" :class="borderColor">
    <!-- Header Row -->
    <div class="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
      <!-- Left: Avatar and Info -->
      <div class="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
        <!-- Avatar -->
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-base sm:text-lg flex-shrink-0">
          {{ getInitial(unicorn.name) }}
        </div>
        
        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 sm:gap-3 mb-1">
            <span class="text-xs text-gray-500">No {{ index }}</span>
            <span class="text-xs text-gray-400">•</span>
            <span class="text-xs text-gray-500 truncate">Doctor Name</span>
          </div>
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-2 truncate">{{ unicorn.name }}</h3>
          
          <div class="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600">
            <div>
              <span class="text-xs text-gray-500">Age</span>
              <p class="font-medium">{{ unicorn.age }}</p>
            </div>
            <div>
              <span class="text-xs text-gray-500">Color</span>
              <p class="font-medium">{{ unicorn.color }}</p>
            </div>
            <div>
              <span class="text-xs text-gray-500">Status</span>
              <div class="mt-1">
                <span class="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-medium" :class="statusBgColor">
                  <span>{{ getStatusEmoji(unicorn.status) }}</span>
                  <span class="truncate">{{ unicorn.status }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Action Buttons -->
      <div class="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
        <button
          @click="$emit('edit', unicorn)"
          class="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Edit
        </button>
        <button
          @click="$emit('delete', unicorn._id!)"
          class="w-9 h-9 flex items-center justify-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex-shrink-0"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Expandable Details Section -->
    <div v-if="showDetails" class="pt-4 border-t border-gray-100">
      <div class="bg-purple-50 rounded-lg p-4 text-center">
        <svg class="w-12 h-12 mx-auto mb-2 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p class="text-sm text-purple-600">The body copy explains the empty state.</p>
        <p class="text-xs text-purple-500 mt-1">The icon relates to the situation</p>
      </div>
    </div>

    <!-- Show/Hide Details Toggle -->
    <div class="mt-4 text-right">
      <button
        @click="toggleDetails"
        class="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 ml-auto"
      >
        {{ showDetails ? 'Hide details' : 'Show details' }}
        <svg
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': showDetails }"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UnicornWithStatus } from '@/types/unicorn'
import { getStatusColor, getStatusBgColor } from '@/types/unicorn'

interface Props {
  unicorn: UnicornWithStatus
  index: number
}

const props = defineProps<Props>()

defineEmits<{
  edit: [unicorn: UnicornWithStatus]
  delete: [id: string]
}>()

const showDetails = ref(false)

const borderColor = getStatusColor(props.unicorn.status)
const statusBgColor = getStatusBgColor(props.unicorn.status)

const getInitial = (name: string) => {
  return name.charAt(0).toUpperCase()
}

const getStatusEmoji = (status: string) => {
  if (status.includes('Baby')) return '👶'
  if (status.includes('Mature')) return '🌱'
  if (status.includes('Old')) return '👴'
  return '🦄'
}

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>
