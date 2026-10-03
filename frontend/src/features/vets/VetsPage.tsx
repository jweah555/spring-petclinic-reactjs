import QueryStatus from '../../components/QueryStatus.tsx'
import { useVets } from './api.ts'

export default function VetsPage() {
  const { data: vets, isPending, error } = useVets()

  return (
    <section>
      <h1>Veterinarians</h1>

      {!vets && <QueryStatus isPending={isPending} error={error} what="Veterinarians" />}
      {vets && vets.length === 0 && <p>No veterinarians found.</p>}

      {vets && vets.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialties</th>
              </tr>
            </thead>
            <tbody>
              {vets.map((vet) => (
                <tr key={vet.id}>
                  <td>
                    {vet.firstName} {vet.lastName}
                  </td>
                  <td>
                    {vet.specialties.length > 0 ? (
                      vet.specialties.map((specialty) => specialty.name).join(', ')
                    ) : (
                      <span className="muted">none</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
