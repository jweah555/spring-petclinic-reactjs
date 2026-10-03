import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router'
import { applyServerErrors } from '../../api/formErrors.ts'
import FormField from '../../components/FormField.tsx'
import QueryStatus from '../../components/QueryStatus.tsx'
import { today } from '../../utils/dates.ts'
import { useOwnerPet } from '../pets/api.ts'
import { useCreateVisit } from './api.ts'
import { visitSchema, type VisitFormValues } from './visitSchema.ts'

export default function NewVisitPage() {
  const params = useParams()
  const ownerId = Number(params.ownerId)
  const petId = Number(params.petId)
  const navigate = useNavigate()
  const pet = useOwnerPet(ownerId, petId)
  const createVisit = useCreateVisit(ownerId, petId)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<VisitFormValues>({
    resolver: zodResolver(visitSchema),
    defaultValues: { date: today(), description: '' },
  })

  async function submit(values: VisitFormValues) {
    try {
      await createVisit.mutateAsync(values)
      navigate(`/owners/${ownerId}`)
    } catch (error) {
      applyServerErrors(error, setError, ['date', 'description'])
    }
  }

  if (!pet.data) return <QueryStatus isPending={pet.isPending} error={pet.error} what="Pet" />

  const previousVisits = [...pet.data.visits].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section>
      <Link to={`/owners/${ownerId}`}>← Back to owner</Link>
      <h1>New visit</h1>

      <article className="card">
        <h3>
          {pet.data.name} <span className="muted">({pet.data.type.name}, born {pet.data.birthDate})</span>
        </h3>
      </article>

      <form className="form" onSubmit={handleSubmit(submit)} noValidate>
        <FormField id="date" label="Date" error={errors.date?.message}>
          <input
            id="date"
            type="date"
            aria-invalid={errors.date ? true : undefined}
            aria-describedby={errors.date ? 'date-error' : undefined}
            {...register('date')}
          />
        </FormField>

        <FormField id="description" label="Description" error={errors.description?.message}>
          <textarea
            id="description"
            rows={3}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={errors.description ? 'description-error' : undefined}
            {...register('description')}
          />
        </FormField>

        {errors.root && <p className="error">{errors.root.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Add visit'}
        </button>
      </form>

      <h2>Previous visits</h2>
      {previousVisits.length === 0 ? (
        <p className="muted">No previous visits.</p>
      ) : (
        <ul>
          {previousVisits.map((visit) => (
            <li key={visit.id}>
              {visit.date}: {visit.description}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
