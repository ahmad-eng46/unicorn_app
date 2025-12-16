<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">
        {{ isEditMode ? 'Edit Unicorn' : 'Create Unicorn' }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <!-- Name Field -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            placeholder="Write Name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            :class="{ 'border-red-500': errors.name }"
          />
          <p v-if="!formData.name" class="text-xs text-gray-400 mt-1">
            This is the unicorn name
          </p>
          <p v-if="errors.name" class="text-xs text-red-500 mt-1">
            {{ errors.name }}
          </p>
        </div>

        <!-- Age Field -->
        <div class="mb-4">
          <label for="age" class="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            id="age"
            v-model.number="formData.age"
            type="number"
            placeholder="Write age"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            :class="{ 'border-red-500': errors.age }"
          />
          <p v-if="errors.age" class="text-xs text-red-500 mt-1">
            {{ errors.age }}
          </p>
        </div>

        <!-- Color Field -->
        <div class="mb-6">
          <label for="color" class="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <input
            id="color"
            v-model="formData.color"
            type="text"
            placeholder="Write color"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            :class="{ 'border-red-500': errors.color }"
          />
          <p v-if="errors.color" class="text-xs text-red-500 mt-1">
            {{ errors.color }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 justify-end">
          <button
            type="button"
            @click="closeModal"
            class="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Saving...' : isEditMode ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Unicorn } from '@/types/unicorn'

interface Props {
  isOpen: boolean
  unicorn?: Unicorn | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  unicorn: null,
  loading: false,
})

const emit = defineEmits<{
  close: []
  submit: [data: Omit<Unicorn, '_id'>]
}>()

const formData = ref({
  name: '',
  age: 0,
  color: '',
})

const errors = ref({
  name: '',
  age: '',
  color: '',
})

const isEditMode = ref(false)

const resetForm = () => {
  formData.value = {
    name: '',
    age: 0,
    color: '',
  }
  errors.value = {
    name: '',
    age: '',
    color: '',
  }
}

// Watch for unicorn prop changes (for edit mode)
watch(
  () => props.unicorn,
  (unicorn) => {
    if (unicorn) {
      isEditMode.value = true
      formData.value = {
        name: unicorn.name,
        age: unicorn.age,
        color: unicorn.color,
      }
    } else {
      isEditMode.value = false
      resetForm()
    }
  },
  { immediate: true }
)

// Watch for modal open/close to reset form
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen && !props.unicorn) {
      // Modal opened for create mode, ensure form is reset
      resetForm()
    }
  }
)

const validateForm = (): boolean => {
  errors.value = {
    name: '',
    age: '',
    color: '',
  }

  let isValid = true

  // Name validation
  if (!formData.value.name || formData.value.name.trim() === '') {
    errors.value.name = 'Name is required'
    isValid = false
  } else if (formData.value.name.trim().length < 3) {
    errors.value.name = 'Name must be at least 3 characters'
    isValid = false
  } else if (formData.value.name.trim().length > 20) {
    errors.value.name = 'Name must not be more than 20 characters'
    isValid = false
  } else if (!/^[a-zA-Z\s]+$/.test(formData.value.name.trim())) {
    errors.value.name = 'Name must contain only letters and spaces'
    isValid = false
  }

  // Age validation
  if (formData.value.age === null || formData.value.age === undefined || formData.value.age === 0) {
    errors.value.age = 'Age is required'
    isValid = false
  } else if (!Number.isInteger(formData.value.age)) {
    errors.value.age = 'Age must be a whole number'
    isValid = false
  } else if (formData.value.age < 1) {
    errors.value.age = 'Age must be a positive number'
    isValid = false
  } else if (formData.value.age > 200) {
    errors.value.age = 'Age must not be greater than 200'
    isValid = false
  }

  // Color validation
  if (!formData.value.color || formData.value.color.trim() === '') {
    errors.value.color = 'Color is required'
    isValid = false
  } else if (formData.value.color.length < 2) {
    errors.value.color = 'Color must be at least 2 characters'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  emit('submit', {
    name: formData.value.name.trim(),
    age: formData.value.age,
    color: formData.value.color.trim(),
  })
}

const closeModal = () => {
  resetForm()
  emit('close')
}
</script>
