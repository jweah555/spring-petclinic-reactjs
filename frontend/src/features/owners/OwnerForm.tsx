import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { applyServerErrors } from '../../api/formErrors.ts'
import FormField from '../../components/FormField.tsx'
import { ownerSchema, type OwnerFormValues } from './ownerSchema.ts'

const fields: { name: keyof OwnerFormValues; label: string; type?: string }[] = [
  { name: 'firstName', label: 'First name' },
  { name: 'lastName', label: 'Last name' },
  { name: 'address', label: 'Address' },
  { name: 'city', label: 'City' },
  { name: 'telephone', label: 'Telephone', type: 'tel' },
]

const emptyOwner: OwnerFormValues = { firstName: '', lastName: '', address: '', city: '', telephone: '' }

interface OwnerFormProps {
  defaultValues?: OwnerFormValues
  submitLabel: string
  onSubmit: (values: OwnerFormValues) => Promise<void>
}

/** Shared by the add and edit owner pages. */
export default function OwnerForm({ defaultValues = emptyOwner, submitLabel, onSubmit }: OwnerFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OwnerFormValues>({
    resolver: zodResolver(ownerSchema),
    defaultValues,
  })

  async function submit(values: OwnerFormValues) {
    try {
      await onSubmit(values)
    } catch (error) {
      applyServerErrors(error, setError, fields.map((field) => field.name))
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(submit)} noValidate>
      {fields.map(({ name, label, type = 'text' }) => (
        <FormField key={name} id={name} label={label} error={errors[name]?.message}>
          <input
            id={name}
            type={type}
            aria-invalid={errors[name] ? true : undefined}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
            {...register(name)}
          />
        </FormField>
      ))}

      {errors.root && <p className="error">{errors.root.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}
