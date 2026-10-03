import { z } from 'zod'

// Same rules as OwnerFields in the backend's openapi.yml, so most mistakes are caught before a request is sent.
// The backend still validates everything; this is for fast feedback, not security.
const lettersOnly = /^[a-zA-Z]*$/
const digitsOnly = /^[0-9]*$/

export const ownerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(30, 'First name must be 30 characters or fewer')
    .regex(lettersOnly, 'First name can only contain letters'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(30, 'Last name must be 30 characters or fewer')
    .regex(lettersOnly, 'Last name can only contain letters'),
  address: z
    .string()
    .trim()
    .min(1, 'Address is required')
    .max(255, 'Address must be 255 characters or fewer'),
  city: z
    .string()
    .trim()
    .min(1, 'City is required')
    .max(80, 'City must be 80 characters or fewer'),
  telephone: z
    .string()
    .trim()
    .min(1, 'Telephone is required')
    .max(20, 'Telephone must be 20 digits or fewer')
    .regex(digitsOnly, 'Telephone can only contain digits'),
})

export type OwnerFormValues = z.infer<typeof ownerSchema>
