import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiGet, apiPost } from '../../api/client.ts'
import type { OwnerFormValues } from './ownerSchema.ts'
import type { Owner } from './types.ts'

export const ownerKeys = {
  all: ['owners'] as const,
  list: (lastName: string) => [...ownerKeys.all, 'list', lastName] as const,
  detail: (id: number) => [...ownerKeys.all, 'detail', id] as const,
}

export function useOwners(lastName: string) {
  return useQuery({
    queryKey: ownerKeys.list(lastName),
    queryFn: () => {
      const query = lastName ? `?lastName=${encodeURIComponent(lastName)}` : ''
      return apiGet<Owner[]>(`/owners${query}`)
    },
  })
}

export function useOwner(id: number) {
  return useQuery({
    queryKey: ownerKeys.detail(id),
    queryFn: () => apiGet<Owner>(`/owners/${id}`),
    enabled: Number.isInteger(id),
  })
}

export function useCreateOwner() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: OwnerFormValues) => apiPost<Owner>('/owners', values),
    onSuccess: (owner) => {
      // The cached owner lists are now out of date; refetch them next time they are shown.
      queryClient.invalidateQueries({ queryKey: ownerKeys.all })
      queryClient.setQueryData(ownerKeys.detail(owner.id), owner)
    },
  })
}
