<template>
  <div class="flex items-center justify-center gap-2 mt-6">
    <!-- Previous Button -->
    <button
      @click="$emit('change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Page Numbers -->
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="$emit('change', page)"
      class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors"
      :class="
        page === currentPage
          ? 'bg-primary text-white'
          : 'border border-gray-300 hover:bg-gray-50'
      "
    >
      {{ page }}
    </button>

    <!-- More indicator if needed -->
    <span v-if="totalPages > 6 && currentPage < totalPages - 2" class="text-gray-400">...</span>

    <!-- Last page if not visible -->
    <button
      v-if="totalPages > 6 && !visiblePages.includes(totalPages)"
      @click="$emit('change', totalPages)"
      class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
    >
      {{ totalPages }}
    </button>

    <!-- Next Button -->
    <button
      @click="$emit('change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()

defineEmits<{
  change: [page: number]
}>()

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 6

  if (props.totalPages <= maxVisible) {
    // Show all pages
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Show current page and surrounding pages
    let start = Math.max(1, props.currentPage - 2)
    let end = Math.min(props.totalPages, start + maxVisible - 1)

    if (end === props.totalPages) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return pages
})
</script>
