import { Link, useNavigate, useParams } from 'react-router'
import QueryStatus from '../../components/QueryStatus.tsx'
import { useOwner } from '../owners/api.ts'
import { useOwnerPet, usePetTypes, useUpdatePet, type PetFields } from './api.ts'
import PetForm from './PetForm.tsx'

export default function EditPetPage() {
  const params = useParams()
  const ownerId = Number(params.ownerId)
  const petId = Number(params.petId)
  const navigate = useNavigate()
  const owner = useOwner(ownerId)
  const pet = useOwnerPet(ownerId, petId)
  const petTypes = usePetTypes()
  const updatePet = useUpdatePet(ownerId, petId)

  async function handleSubmit(values: PetFields) {
    await updatePet.mutateAsync(values)
    navigate(`/owners/${ownerId}`)
  }

  if (!owner.data) return <QueryStatus isPending={owner.isPending} error={owner.error} what="Owner" />
  if (!pet.data) return <QueryStatus isPending={pet.isPending} error={pet.error} what="Pet" />
  if (!petTypes.data) return <QueryStatus isPending={petTypes.isPending} error={petTypes.error} what="Pet types" />

  return (
    <section>
      <Link to={`/owners/${ownerId}`}>← Back to owner</Link>
      <h1>Edit pet</h1>
      <PetForm
        ownerName={`${owner.data.firstName} ${owner.data.lastName}`}
        petTypes={petTypes.data}
        defaultValues={{ name: pet.data.name, birthDate: pet.data.birthDate, typeId: String(pet.data.type.id) }}
        submitLabel="Update pet"
        onSubmit={handleSubmit}
      />
    </section>
  )
}
