import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { unicornApi } from '@/services/api'
import type { Unicorn, UnicornWithStatus } from '@/types/unicorn'
import { getUnicornStatus } from '@/types/unicorn'

export const useUnicornStore = defineStore('unicorn', () => {
  const unicorns = ref<Unicorn[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const itemsPerPage = 5
  const sortBy = ref<'name' | 'age' | null>(null)
  const sortOrder = ref<'asc' | 'desc'>('asc')

  // Computed: Unicorns with status
  const unicornsWithStatus = computed<UnicornWithStatus[]>(() => {
    return unicorns.value.map(unicorn => ({
      ...unicorn,
      status: getUnicornStatus(unicorn.age),
    }))
  })

  // Computed: Sorted unicorns
  const sortedUnicorns = computed(() => {
    const data = [...unicornsWithStatus.value]
    
    if (sortBy.value === 'name') {
      data.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name)
        return sortOrder.value === 'asc' ? comparison : -comparison
      })
    } else if (sortBy.value === 'age') {
      data.sort((a, b) => {
        const comparison = a.age - b.age
        return sortOrder.value === 'asc' ? comparison : -comparison
      })
    }
    
    return data
  })

  // Computed: Paginated unicorns
  const paginatedUnicorns = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedUnicorns.value.slice(start, end)
  })

  // Computed: Total pages
  const totalPages = computed(() => {
    return Math.ceil(sortedUnicorns.value.length / itemsPerPage)
  })

  // Fetch all unicorns
  async function fetchUnicorns() {
    loading.value = true
    error.value = null
    try {
      unicorns.value = await unicornApi.getAll()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch unicorns'
      console.error('Error fetching unicorns:', e)
    } finally {
      loading.value = false
    }
  }

  // Create unicorn
  async function createUnicorn(unicorn: Omit<Unicorn, '_id'>) {
    loading.value = true
    error.value = null
    try {
      const newUnicorn = await unicornApi.create(unicorn)
      unicorns.value.push(newUnicorn)
      // If we're on the last page or only have one page, might need to adjust
      if (currentPage.value === totalPages.value || totalPages.value === 1) {
        currentPage.value = totalPages.value
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create unicorn'
      throw e
    } finally {
      loading.value = false
    }
  }

  // Update unicorn
  async function updateUnicorn(id: string, unicorn: Omit<Unicorn, '_id'>) {
    loading.value = true
    error.value = null
    try {
      await unicornApi.update(id, unicorn)
      const index = unicorns.value.findIndex(u => u._id === id)
      if (index !== -1) {
        unicorns.value[index] = { ...unicorn, _id: id }
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update unicorn'
      throw e
    } finally {
      loading.value = false
    }
  }

  // Delete unicorn
  async function deleteUnicorn(id: string) {
    loading.value = true
    error.value = null
    try {
      await unicornApi.delete(id)
      unicorns.value = unicorns.value.filter(u => u._id !== id)
      
      // Adjust current page if needed
      if (paginatedUnicorns.value.length === 0 && currentPage.value > 1) {
        currentPage.value--
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete unicorn'
      throw e
    } finally {
      loading.value = false
    }
  }

  // Set sort
  function setSorting(field: 'name' | 'age') {
    if (sortBy.value === field) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = field
      sortOrder.value = 'asc'
    }
  }

  // Clear sort
  function clearSorting() {
    sortBy.value = null
    sortOrder.value = 'asc'
  }

  // Set page
  function setPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  return {
    unicorns,
    unicornsWithStatus,
    paginatedUnicorns,
    loading,
    error,
    currentPage,
    totalPages,
    sortBy,
    sortOrder,
    fetchUnicorns,
    createUnicorn,
    updateUnicorn,
    deleteUnicorn,
    setSorting,
    clearSorting,
    setPage,
  }
})
