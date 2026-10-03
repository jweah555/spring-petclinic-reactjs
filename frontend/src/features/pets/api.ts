import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiGet, apiPost, apiPut } from '../../api/client.ts'
import { ownerKeys } from '../owners/api.ts'
import type { Pet, PetType } from './types.ts'

/** Request body for creating or updating a pet (PetFields in openapi.yml). */
export interface PetFields {
  name: string
  birthDate: string
  type: PetType
}

export const petKeys = {
  types: ['petTypes'] as const,
  detail: (ownerId: number, petId: number) => ['pets', 'detail', ownerId, petId] as const,
}

export function usePetTypes() {
  return useQuery({
    queryKey: petKeys.types,
    queryFn: () => apiGet<PetType[]>('/pettypes'),
    staleTime: 5 * 60_000, // pet types rarely change
  })
}

export function useOwnerPet(ownerId: number, petId: number) {
  return useQuery({
    queryKey: petKeys.detail(ownerId, petId),
    queryFn: () => apiGet<Pet>(`/owners/${ownerId}/pets/${petId}`),
    enabled: Number.isInteger(ownerId) && Number.isInteger(petId),
  })
}

export function useCreatePet(ownerId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (pet: PetFields) => apiPost<Pet>(`/owners/${ownerId}/pets`, pet),
    // Owners embed their pets, so cached owners are now stale.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ownerKeys.all }),
  })
}

export function useUpdatePet(ownerId: number, petId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (pet: PetFields) => apiPut(`/owners/${ownerId}/pets/${petId}`, pet),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ownerKeys.all }),
        queryClient.invalidateQueries({ queryKey: petKeys.detail(ownerId, petId) }),
      ]),
  })
}
