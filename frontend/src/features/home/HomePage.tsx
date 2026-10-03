import { Link } from 'react-router'

export default function HomePage() {
  return (
    <section>
      <h1>Welcome to PetClinic</h1>
      <p>Manage pet owners, their pets and vet visits.</p>
      <div className="actions">
        <Link to="/owners" className="button">
          Find owners
        </Link>
        <Link to="/owners/new" className="button secondary">
          Add owner
        </Link>
        <Link to="/vets" className="button secondary">
          Veterinarians
        </Link>
      </div>
    </section>
  )
}
