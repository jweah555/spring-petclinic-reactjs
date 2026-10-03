import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiPost } from '../../api/client.ts'
import type { Visit } from '../owners/types.ts'
import { ownerKeys } from '../owners/api.ts'
import { petKeys } from '../pets/api.ts'
import type { VisitFormValues } from './visitSchema.ts'

export function useCreateVisit(ownerId: number, petId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (visit: VisitFormValues) => apiPost<Visit>(`/owners/${ownerId}/pets/${petId}/visits`, visit),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ownerKeys.all }),
        queryClient.invalidateQueries({ queryKey: petKeys.detail(ownerId, petId) }),
      ]),
  })
}
