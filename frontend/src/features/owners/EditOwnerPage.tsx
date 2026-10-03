import { Link, useNavigate, useParams } from 'react-router'
import QueryStatus from '../../components/QueryStatus.tsx'
import { useOwner, useUpdateOwner } from './api.ts'
import OwnerForm from './OwnerForm.tsx'
import type { OwnerFormValues } from './ownerSchema.ts'

export default function EditOwnerPage() {
  const ownerId = Number(useParams().ownerId)
  const navigate = useNavigate()
  const { data: owner, isPending, error } = useOwner(ownerId)
  const updateOwner = useUpdateOwner(ownerId)

  async function handleSubmit(values: OwnerFormValues) {
    await updateOwner.mutateAsync(values)
    navigate(`/owners/${ownerId}`)
  }

  if (!owner) return <QueryStatus isPending={isPending} error={error} what="Owner" />

  const { firstName, lastName, address, city, telephone } = owner

  return (
    <section>
      <Link to={`/owners/${ownerId}`}>← Back to owner</Link>
      <h1>Edit owner</h1>
      <OwnerForm
        defaultValues={{ firstName, lastName, address, city, telephone }}
        submitLabel="Update owner"
        onSubmit={handleSubmit}
      />
    </section>
  )
}
