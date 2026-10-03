import { Link, useParams } from 'react-router'
import { ApiError } from '../../api/client.ts'
import { useOwner } from './api.ts'

export default function OwnerDetailsPage() {
  const { ownerId } = useParams()
  const id = Number(ownerId)
  const { data: owner, isPending, isError, error } = useOwner(id)

  if (!Number.isInteger(id)) return <p className="error">Invalid owner id.</p>
  if (isPending) return <p>Loading owner…</p>
  if (isError) {
    const notFound = error instanceof ApiError && error.status === 404
    return <p className="error">{notFound ? 'Owner not found.' : `Could not load owner: ${error.message}`}</p>
  }

  return (
    <section>
      <Link to="/owners">← Back to owners</Link>
      <h1>
        {owner.firstName} {owner.lastName}
      </h1>

      <dl className="details">
        <dt>Address</dt>
        <dd>{owner.address}</dd>
        <dt>City</dt>
        <dd>{owner.city}</dd>
        <dt>Telephone</dt>
        <dd>{owner.telephone}</dd>
      </dl>

      <h2>Pets and visits</h2>
      {owner.pets.length === 0 && <p>This owner has no pets yet.</p>}
      {owner.pets.map((pet) => (
        <article key={pet.id} className="card">
          <h3>
            {pet.name} <span className="muted">({pet.type.name}, born {pet.birthDate})</span>
          </h3>
          {pet.visits.length === 0 ? (
            <p className="muted">No visits.</p>
          ) : (
            <ul>
              {pet.visits.map((visit) => (
                <li key={visit.id}>
                  {visit.date}: {visit.description}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </section>
  )
}
