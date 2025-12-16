<template>
  <!-- Mobile Overlay -->
  <div
    v-if="isMobileOpen"
    @click="$emit('close')"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
  ></div>

  <!-- Sidebar -->
  <div
    :class="[
      'w-52 bg-white border-r border-gray-200 text-gray-700 flex flex-col',
      'fixed lg:fixed top-0 left-0 z-50 lg:z-auto h-screen lg:h-screen overflow-y-auto',
      'transform transition-transform duration-300 ease-in-out lg:transform-none',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Logo/Brand & Close Button -->
    <div class="px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </div>
      <!-- Close button for mobile -->
      <button
        @click="$emit('close')"
        class="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Close menu"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3">
      <div class="mb-0.5">
        <a 
          href="#"
          @click="$emit('close')"
          class="flex items-center gap-3 px-3 py-2.5 rounded-md bg-gray-100 text-gray-900 font-medium"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          <span class="text-sm">Dashboard</span>
        </a>
      </div>
      
      <div class="mb-0.5">
        <a 
          href="#"
          @click="$emit('close')"
          class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <span class="text-sm">Team</span>
        </a>
      </div>
      
      <div class="mb-0.5">
        <a 
          href="#" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span class="text-sm">Projects</span>
        </a>
      </div>
      
      <div class="mb-0.5">
        <a 
          href="#" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">Calendar</span>
        </a>
      </div>
      
      <div class="mb-0.5">
        <a 
          href="#" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">Documents</span>
        </a>
      </div>
      
      <div class="mb-0.5">
        <a 
          href="#" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <span class="text-sm">Report</span>
        </a>
      </div>

      <!-- Your teams section -->
      <div class="mt-5 mb-2">
        <h3 class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Your teams
        </h3>
      </div>
      
      <div class="mb-0.5">
        <a 
          href="#" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <span class="text-xs font-semibold w-4">D</span>
          <span class="text-sm">Design</span>
        </a>
      </div>
      
      <div class="mb-0.5">
        <a 
          href="#" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <span class="text-xs font-semibold w-4">E</span>
          <span class="text-sm">Engineering</span>
        </a>
      </div>

      <!-- Reports section -->
      <div class="mt-5 mb-2">
        <h3 class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Reports
        </h3>
      </div>
      
      <div class="mb-0.5">
        <a 
          href="#" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">Month to Date</span>
        </a>
      </div>
      
      <div class="mb-0.5">
        <a 
          href="#" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">Year to Date</span>
        </a>
      </div>
    </nav>

    <!-- User Profile -->
    <div class="p-3 border-t border-gray-200">
      <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white text-xs font-semibold">
        <span>DN</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isMobileOpen: boolean
}>()

defineEmits<{
  close: []
}>()
</script>
