export interface Unicorn {
  _id?: string
  name: string
  age: number
  color: string
}

export type UnicornStatus = 'Baby Unicorn' | 'Mature Unicorn' | 'Old Unicorn'

export interface UnicornWithStatus extends Unicorn {
  status: UnicornStatus
}

export const getUnicornStatus = (age: number): UnicornStatus => {
  if (age >= 0 && age <= 8) return 'Baby Unicorn'
  if (age >= 9 && age <= 25) return 'Mature Unicorn'
  return 'Old Unicorn'
}

export const getStatusColor = (status: UnicornStatus): string => {
  switch (status) {
    case 'Baby Unicorn':
      return 'border-baby-unicorn'
    case 'Mature Unicorn':
      return 'border-mature-unicorn'
    case 'Old Unicorn':
      return 'border-old-unicorn'
    default:
      return 'border-gray-400'
  }
}

export const getStatusBgColor = (status: UnicornStatus): string => {
  switch (status) {
    case 'Baby Unicorn':
      return 'bg-baby-unicorn/10 text-baby-unicorn'
    case 'Mature Unicorn':
      return 'bg-mature-unicorn/10 text-mature-unicorn'
    case 'Old Unicorn':
      return 'bg-old-unicorn/10 text-old-unicorn'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}
