import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router'
import QueryStatus from '../../components/QueryStatus.tsx'
import { useOwners } from './api.ts'

export default function OwnersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const lastName = searchParams.get('lastName') ?? ''
  const [input, setInput] = useState(lastName)
  const { data: owners, isPending, error } = useOwners(lastName)

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = input.trim()
    setSearchParams(trimmed ? { lastName: trimmed } : {})
  }

  return (
    <section>
      <div className="page-header">
        <h1>Owners</h1>
        <Link to="/owners/new" className="button">
          Add owner
        </Link>
      </div>

      <form className="search" onSubmit={handleSearch}>
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="e.g. Davis"
        />
        <button type="submit">Find owners</button>
      </form>

      {!owners && <QueryStatus isPending={isPending} error={error} what="Owners" />}

      {owners && owners.length === 0 && <p>No owners found.</p>}

      {owners && owners.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Telephone</th>
                <th>Pets</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => (
                <tr key={owner.id}>
                  <td>
                    <Link to={`/owners/${owner.id}`}>
                      {owner.firstName} {owner.lastName}
                    </Link>
                  </td>
                  <td>{owner.address}</td>
                  <td>{owner.city}</td>
                  <td>{owner.telephone}</td>
                  <td>{owner.pets.map((pet) => pet.name).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
