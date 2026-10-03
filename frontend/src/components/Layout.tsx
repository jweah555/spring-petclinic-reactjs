import { NavLink, Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <header className="header">
        <span className="brand">PetClinic</span>
        <nav>
          <NavLink to="/owners">Owners</NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}
