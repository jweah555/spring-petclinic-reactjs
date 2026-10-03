import { Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout.tsx'
import AddOwnerPage from './features/owners/AddOwnerPage.tsx'
import OwnerDetailsPage from './features/owners/OwnerDetailsPage.tsx'
import OwnersPage from './features/owners/OwnersPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/owners" replace />} />
        <Route path="owners" element={<OwnersPage />} />
        <Route path="owners/new" element={<AddOwnerPage />} />
        <Route path="owners/:ownerId" element={<OwnerDetailsPage />} />
        <Route path="*" element={<p>Page not found.</p>} />
      </Route>
    </Routes>
  )
}
