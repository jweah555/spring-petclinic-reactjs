import type { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

/** Label + input + error message. The input passed as children should use the same `id` and `aria-describedby={`${id}-error`}`. */
export default function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} className="error field-error">
          {error}
        </p>
      )}
    </div>
  )
}
