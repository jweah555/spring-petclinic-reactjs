import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { ApiError } from './client.ts'

/**
 * Shows server-side validation messages next to the matching form inputs.
 * `fieldMap` translates backend field names to form field names when they differ (e.g. `type` -> `typeId`).
 */
export function applyServerErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fieldNames: readonly Path<T>[],
  fieldMap: Record<string, Path<T>> = {},
) {
  let matched = false

  if (error instanceof ApiError) {
    for (const fieldError of error.fieldErrors) {
      const name = fieldMap[fieldError.fieldName] ?? (fieldError.fieldName as Path<T>)
      if (fieldNames.includes(name)) {
        setError(name, { message: fieldError.errorMessage })
        matched = true
      }
    }
  }

  if (!matched) {
    setError('root', { message: 'Could not save. Please try again.' })
  }
}
