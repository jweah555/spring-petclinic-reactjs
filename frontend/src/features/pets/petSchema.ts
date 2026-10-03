import { z } from 'zod'
import { today } from '../../utils/dates.ts'

// Mirrors PetFields in openapi.yml (name max 30, birthDate and type required), plus two rules the backend
// doesn't enforce but users expect: a non-empty name and a birth date that isn't in the future.
export const petSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(30, 'Name must be 30 characters or fewer'),
  birthDate: z.iso
    .date({ error: 'Enter a valid birth date' })
    .refine((date) => date <= today(), 'Birth date cannot be in the future'),
  typeId: z.string().min(1, 'Choose a pet type'),
})

export type PetFormValues = z.infer<typeof petSchema>
