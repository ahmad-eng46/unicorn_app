import axios from 'axios'
import type { Unicorn } from '@/types/unicorn'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const unicornApi = {
  // Get all unicorns
  async getAll(): Promise<Unicorn[]> {
    const response = await apiClient.get<Unicorn[]>('/unicorns')
    return response.data
  },

  // Get single unicorn by ID
  async getById(id: string): Promise<Unicorn> {
    const response = await apiClient.get<Unicorn>(`/unicorns/${id}`)
    return response.data
  },

  // Create new unicorn
  async create(unicorn: Omit<Unicorn, '_id'>): Promise<Unicorn> {
    const response = await apiClient.post<Unicorn>('/unicorns', unicorn)
    return response.data
  },

  // Update unicorn
  async update(id: string, unicorn: Omit<Unicorn, '_id'>): Promise<void> {
    await apiClient.put(`/unicorns/${id}`, unicorn)
  },

  // Delete unicorn
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/unicorns/${id}`)
  },
}
