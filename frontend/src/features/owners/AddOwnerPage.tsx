import { Link, useNavigate } from 'react-router'
import { useCreateOwner } from './api.ts'
import OwnerForm from './OwnerForm.tsx'
import type { OwnerFormValues } from './ownerSchema.ts'

export default function AddOwnerPage() {
  const navigate = useNavigate()
  const createOwner = useCreateOwner()

  async function handleSubmit(values: OwnerFormValues) {
    const owner = await createOwner.mutateAsync(values)
    navigate(`/owners/${owner.id}`)
  }

  return (
    <section>
      <Link to="/owners">← Back to owners</Link>
      <h1>Add owner</h1>
      <OwnerForm submitLabel="Add owner" onSubmit={handleSubmit} />
    </section>
  )
}
