<template>
  <Transition name="toast">
    <div
      v-if="visible"
      class="fixed bottom-8 right-8 z-50 max-w-sm"
    >
      <div
        class="rounded-lg shadow-lg p-4 flex items-center gap-3"
        :class="bgClass"
      >
        <!-- Icon -->
        <div class="flex-shrink-0">
          <svg
            v-if="type === 'success'"
            class="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-if="type === 'error'"
            class="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- Content -->
        <div class="flex-1">
          <h4 class="font-semibold">{{ title }}</h4>
          <p class="text-sm opacity-90">{{ message }}</p>
        </div>

        <!-- Close Button -->
        <button
          @click="close"
          class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  type: 'success' | 'error'
  title: string
  message: string
  duration?: number
  show: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(props.show)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const bgClass = computed(() => {
  return props.type === 'success'
    ? 'bg-green-500 text-white'
    : 'bg-red-500 text-white'
})

watch(
  () => props.show,
  (show) => {
    visible.value = show
    if (show) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        close()
      }, props.duration)
    }
  }
)

const close = () => {
  visible.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  emit('close')
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
