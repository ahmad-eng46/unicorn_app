<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <Sidebar :is-mobile-open="isMobileMenuOpen" @close="closeMobileMenu" />

    <!-- Main Content -->
    <div class="flex-1 overflow-x-hidden lg:ml-52">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <!-- Hamburger Menu Button (Mobile Only) -->
            <button
              @click="toggleMobileMenu"
              class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 class="text-xl md:text-2xl font-semibold text-gray-900">Welcome John Doe</h1>
            </div>
          </div>
          <button
            @click="openCreateModal"
            class="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm md:text-base"
          >
            <svg class="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span class="hidden sm:inline">Create Unicorn</span>
            <span class="sm:hidden">Create</span>
          </button>
        </div>
      </header>

      <!-- Content Area -->
      <main class="p-4 sm:p-6 md:p-8">
        <!-- Sorting Controls -->
        <div class="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
          <span class="text-sm text-gray-600">Sort by:</span>
          <button
            @click="handleSort('name')"
            class="px-3 py-1.5 text-sm rounded-lg border transition-colors"
            :class="
              sortBy === 'name'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            "
          >
            Name
            <span v-if="sortBy === 'name'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </button>
          <button
            @click="handleSort('age')"
            class="px-3 py-1.5 text-sm rounded-lg border transition-colors"
            :class="
              sortBy === 'age'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            "
          >
            Age
            <span v-if="sortBy === 'age'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </button>
          <button
            v-if="sortBy"
            @click="clearSort"
            class="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900"
          >
            Clear
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p class="font-semibold">Error loading unicorns</p>
          <p class="text-sm">{{ error }}</p>
          <button
            @click="fetchData"
            class="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="!paginatedUnicorns.length"
          class="bg-white rounded-lg p-12 text-center"
        >
          <svg
            class="w-16 h-16 mx-auto mb-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" stroke-width="2" />
            <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No unicorns yet</h3>
          <p class="text-gray-600 mb-4">Get started by creating your first unicorn</p>
          <button
            @click="openCreateModal"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Create Unicorn
          </button>
        </div>

        <!-- Unicorn List -->
        <div v-else>
          <UnicornCard
            v-for="(unicorn, index) in paginatedUnicorns"
            :key="unicorn._id"
            :unicorn="unicorn"
            :index="(currentPage - 1) * 5 + index + 1"
            @edit="openEditModal"
            @delete="handleDelete"
          />

          <!-- Pagination -->
          <Pagination
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            @change="handlePageChange"
          />
        </div>
      </main>
    </div>

    <!-- Unicorn Form Modal -->
    <UnicornForm
      :is-open="isModalOpen"
      :unicorn="selectedUnicorn"
      :loading="formLoading"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <!-- Toast Notification -->
    <Toast
      :show="toast.show"
      :type="toast.type"
      :title="toast.title"
      :message="toast.message"
      @close="toast.show = false"
    />

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      :is-open="confirmDialog.show"
      :title="confirmDialog.title"
      :message="confirmDialog.message"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUnicornStore } from './stores/unicorn'
import Sidebar from './components/Sidebar.vue'
import UnicornCard from './components/UnicornCard.vue'
import UnicornForm from './components/UnicornForm.vue'
import Pagination from './components/Pagination.vue'
import Toast from './components/Toast.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import type { Unicorn, UnicornWithStatus } from './types/unicorn'

const store = useUnicornStore()

const isModalOpen = ref(false)
const selectedUnicorn = ref<Unicorn | null>(null)
const formLoading = ref(false)
const isMobileMenuOpen = ref(false)

const toast = ref({
  show: false,
  type: 'success' as 'success' | 'error',
  title: '',
  message: '',
})

const confirmDialog = ref({
  show: false,
  title: '',
  message: '',
  unicornId: '',
  unicornName: '',
})

// Computed properties from store
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const paginatedUnicorns = computed(() => store.paginatedUnicorns)
const currentPage = computed(() => store.currentPage)
const totalPages = computed(() => store.totalPages)
const sortBy = computed(() => store.sortBy)
const sortOrder = computed(() => store.sortOrder)

// Fetch data on mount
onMounted(async () => {
  await fetchData()
})

const fetchData = async () => {
  await store.fetchUnicorns()
}

// Modal handlers
const openCreateModal = () => {
  selectedUnicorn.value = null
  isModalOpen.value = true
}

const openEditModal = (unicorn: UnicornWithStatus) => {
  selectedUnicorn.value = unicorn
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedUnicorn.value = null
}

// Form submission
const handleSubmit = async (data: Omit<Unicorn, '_id'>) => {
  formLoading.value = true
  try {
    if (selectedUnicorn.value?._id) {
      // Update existing unicorn
      await store.updateUnicorn(selectedUnicorn.value._id, data)
      showToast('success', 'Unicorn updated', `"${data.name}" has been updated successfully`)
    } else {
      // Create new unicorn
      await store.createUnicorn(data)
      showToast('success', 'Unicorn created', `"${data.name}" has been added to the list`)
    }
    closeModal()
  } catch (e) {
    showToast(
      'error',
      'Operation failed',
      e instanceof Error ? e.message : 'Something went wrong'
    )
  } finally {
    formLoading.value = false
  }
}

// Delete handler
const handleDelete = (id: string) => {
  const unicorn = store.unicornsWithStatus.find((u) => u._id === id)
  if (!unicorn) return

  confirmDialog.value = {
    show: true,
    title: 'Delete Unicorn',
    message: `Are you sure you want to delete "${unicorn.name}"? This action cannot be undone.`,
    unicornId: id,
    unicornName: unicorn.name,
  }
}

const confirmDelete = async () => {
  const { unicornId, unicornName } = confirmDialog.value
  confirmDialog.value.show = false

  try {
    await store.deleteUnicorn(unicornId)
    showToast('success', 'Unicorn deleted', `"${unicornName}" deleted from the database`)
  } catch (e) {
    showToast(
      'error',
      'Delete failed',
      e instanceof Error ? e.message : 'Failed to delete unicorn'
    )
  }
}

const cancelDelete = () => {
  confirmDialog.value.show = false
}

// Sorting
const handleSort = (field: 'name' | 'age') => {
  store.setSorting(field)
}

const clearSort = () => {
  store.clearSorting()
}

// Pagination
const handlePageChange = (page: number) => {
  store.setPage(page)
}

// Mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Toast helper
const showToast = (
  type: 'success' | 'error',
  title: string,
  message: string
) => {
  toast.value = {
    show: true,
    type,
    title,
    message,
  }
}
</script>
