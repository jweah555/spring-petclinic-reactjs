import { z } from 'zod'

// Mirrors VisitFields in openapi.yml.
export const visitSchema = z.object({
  date: z.iso.date({ error: 'Enter a valid date' }),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(255, 'Description must be 255 characters or fewer'),
})

export type VisitFormValues = z.infer<typeof visitSchema>
