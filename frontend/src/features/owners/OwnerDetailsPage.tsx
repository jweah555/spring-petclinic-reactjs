import { Link, useParams } from 'react-router'
import QueryStatus from '../../components/QueryStatus.tsx'
import { useOwner } from './api.ts'

export default function OwnerDetailsPage() {
  const ownerId = Number(useParams().ownerId)
  const { data: owner, isPending, error } = useOwner(ownerId)

  if (!owner) return <QueryStatus isPending={isPending} error={error} what="Owner" />

  return (
    <section>
      <Link to="/owners">← Back to owners</Link>
      <div className="page-header">
        <h1>
          {owner.firstName} {owner.lastName}
        </h1>
        <Link to={`/owners/${owner.id}/edit`} className="button secondary">
          Edit owner
        </Link>
      </div>

      <dl className="details">
        <dt>Address</dt>
        <dd>{owner.address}</dd>
        <dt>City</dt>
        <dd>{owner.city}</dd>
        <dt>Telephone</dt>
        <dd>{owner.telephone}</dd>
      </dl>

      <div className="page-header">
        <h2>Pets and visits</h2>
        <Link to={`/owners/${owner.id}/pets/new`} className="button">
          Add pet
        </Link>
      </div>

      {owner.pets.length === 0 && <p>This owner has no pets yet.</p>}
      {owner.pets.map((pet) => (
        <article key={pet.id} className="card">
          <div className="page-header">
            <h3>
              {pet.name} <span className="muted">({pet.type.name}, born {pet.birthDate})</span>
            </h3>
            <div className="actions">
              <Link to={`/owners/${owner.id}/pets/${pet.id}/edit`}>Edit pet</Link>
              <Link to={`/owners/${owner.id}/pets/${pet.id}/visits/new`}>Add visit</Link>
            </div>
          </div>
          {pet.visits.length === 0 ? (
            <p className="muted">No visits.</p>
          ) : (
            <ul>
              {[...pet.visits]
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((visit) => (
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
