import { NavLink, Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <header className="header">
        <NavLink to="/" className="brand" end>
          PetClinic
        </NavLink>
        <nav className="nav">
          <NavLink to="/owners">Find owners</NavLink>
          <NavLink to="/vets">Veterinarians</NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}
