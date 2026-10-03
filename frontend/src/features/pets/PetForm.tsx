import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { applyServerErrors } from '../../api/formErrors.ts'
import FormField from '../../components/FormField.tsx'
import { today } from '../../utils/dates.ts'
import type { PetFields } from './api.ts'
import { petSchema, type PetFormValues } from './petSchema.ts'
import type { PetType } from './types.ts'

const emptyPet: PetFormValues = { name: '', birthDate: '', typeId: '' }

interface PetFormProps {
  ownerName: string
  petTypes: PetType[]
  defaultValues?: PetFormValues
  submitLabel: string
  onSubmit: (pet: PetFields) => Promise<void>
}

/** Shared by the add and edit pet pages. */
export default function PetForm({ ownerName, petTypes, defaultValues = emptyPet, submitLabel, onSubmit }: PetFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
    defaultValues,
  })

  async function submit(values: PetFormValues) {
    const type = petTypes.find((petType) => String(petType.id) === values.typeId)
    if (!type) {
      setError('typeId', { message: 'Choose a pet type' })
      return
    }
    try {
      await onSubmit({ name: values.name, birthDate: values.birthDate, type })
    } catch (error) {
      applyServerErrors(error, setError, ['name', 'birthDate', 'typeId'], { type: 'typeId' })
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(submit)} noValidate>
      <div className="field">
        <span className="label">Owner</span>
        <span>{ownerName}</span>
      </div>

      <FormField id="name" label="Name" error={errors.name?.message}>
        <input
          id="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
      </FormField>

      <FormField id="birthDate" label="Birth date" error={errors.birthDate?.message}>
        <input
          id="birthDate"
          type="date"
          max={today()}
          aria-invalid={errors.birthDate ? true : undefined}
          aria-describedby={errors.birthDate ? 'birthDate-error' : undefined}
          {...register('birthDate')}
        />
      </FormField>

      <FormField id="typeId" label="Type" error={errors.typeId?.message}>
        <select
          id="typeId"
          aria-invalid={errors.typeId ? true : undefined}
          aria-describedby={errors.typeId ? 'typeId-error' : undefined}
          {...register('typeId')}
        >
          <option value="">Choose a type…</option>
          {petTypes.map((petType) => (
            <option key={petType.id} value={String(petType.id)}>
              {petType.name}
            </option>
          ))}
        </select>
      </FormField>

      {errors.root && <p className="error">{errors.root.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}
