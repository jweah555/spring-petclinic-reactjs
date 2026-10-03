import { Link, useNavigate, useParams } from 'react-router'
import QueryStatus from '../../components/QueryStatus.tsx'
import { useOwner } from '../owners/api.ts'
import { useCreatePet, usePetTypes, type PetFields } from './api.ts'
import PetForm from './PetForm.tsx'

export default function NewPetPage() {
  const ownerId = Number(useParams().ownerId)
  const navigate = useNavigate()
  const owner = useOwner(ownerId)
  const petTypes = usePetTypes()
  const createPet = useCreatePet(ownerId)

  async function handleSubmit(pet: PetFields) {
    await createPet.mutateAsync(pet)
    navigate(`/owners/${ownerId}`)
  }

  if (!owner.data) return <QueryStatus isPending={owner.isPending} error={owner.error} what="Owner" />
  if (!petTypes.data) return <QueryStatus isPending={petTypes.isPending} error={petTypes.error} what="Pet types" />

  return (
    <section>
      <Link to={`/owners/${ownerId}`}>← Back to owner</Link>
      <h1>Add pet</h1>
      <PetForm
        ownerName={`${owner.data.firstName} ${owner.data.lastName}`}
        petTypes={petTypes.data}
        submitLabel="Add pet"
        onSubmit={handleSubmit}
      />
    </section>
  )
}
