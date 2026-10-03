import { useQuery } from '@tanstack/react-query'
import { apiGet, isNotFound } from '../../api/client.ts'
import type { Vet } from './types.ts'

export function useVets() {
  return useQuery({
    queryKey: ['vets'],
    queryFn: async () => {
      try {
        return await apiGet<Vet[]>('/vets')
      } catch (error) {
        // Like owners, the backend answers 404 for an empty list.
        if (isNotFound(error)) return []
        throw error
      }
    },
  })
}
