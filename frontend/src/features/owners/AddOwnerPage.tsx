import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { ApiError } from '../../api/client.ts'
import { useCreateOwner } from './api.ts'
import { ownerSchema, type OwnerFormValues } from './ownerSchema.ts'

const fields: { name: keyof OwnerFormValues; label: string; type?: string }[] = [
  { name: 'firstName', label: 'First name' },
  { name: 'lastName', label: 'Last name' },
  { name: 'address', label: 'Address' },
  { name: 'city', label: 'City' },
  { name: 'telephone', label: 'Telephone', type: 'tel' },
]

export default function AddOwnerPage() {
  const navigate = useNavigate()
  const createOwner = useCreateOwner()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OwnerFormValues>({
    resolver: zodResolver(ownerSchema),
    defaultValues: { firstName: '', lastName: '', address: '', city: '', telephone: '' },
  })

  async function onSubmit(values: OwnerFormValues) {
    try {
      const owner = await createOwner.mutateAsync(values)
      navigate(`/owners/${owner.id}`)
    } catch (error) {
      if (error instanceof ApiError && error.fieldErrors.length > 0) {
        // Show server-side validation messages next to the matching inputs.
        for (const fieldError of error.fieldErrors) {
          const name = fieldError.fieldName as keyof OwnerFormValues
          setError(name, { message: fieldError.errorMessage })
        }
      } else {
        setError('root', { message: 'Could not save the owner. Please try again.' })
      }
    }
  }

  return (
    <section>
      <Link to="/owners">← Back to owners</Link>
      <h1>Add owner</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {fields.map(({ name, label, type = 'text' }) => (
          <div key={name} className="field">
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              type={type}
              aria-invalid={errors[name] ? true : undefined}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
              {...register(name)}
            />
            {errors[name] && (
              <p id={`${name}-error`} className="error field-error">
                {errors[name].message}
              </p>
            )}
          </div>
        ))}

        {errors.root && <p className="error">{errors.root.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Add owner'}
        </button>
      </form>
    </section>
  )
}
