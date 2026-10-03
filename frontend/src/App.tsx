import { Route, Routes } from 'react-router'
import Layout from './components/Layout.tsx'
import HomePage from './features/home/HomePage.tsx'
import NotFoundPage from './features/home/NotFoundPage.tsx'
import AddOwnerPage from './features/owners/AddOwnerPage.tsx'
import EditOwnerPage from './features/owners/EditOwnerPage.tsx'
import OwnerDetailsPage from './features/owners/OwnerDetailsPage.tsx'
import OwnersPage from './features/owners/OwnersPage.tsx'
import EditPetPage from './features/pets/EditPetPage.tsx'
import NewPetPage from './features/pets/NewPetPage.tsx'
import VetsPage from './features/vets/VetsPage.tsx'
import NewVisitPage from './features/visits/NewVisitPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="owners" element={<OwnersPage />} />
        <Route path="owners/new" element={<AddOwnerPage />} />
        <Route path="owners/:ownerId" element={<OwnerDetailsPage />} />
        <Route path="owners/:ownerId/edit" element={<EditOwnerPage />} />
        <Route path="owners/:ownerId/pets/new" element={<NewPetPage />} />
        <Route path="owners/:ownerId/pets/:petId/edit" element={<EditPetPage />} />
        <Route path="owners/:ownerId/pets/:petId/visits/new" element={<NewVisitPage />} />
        <Route path="vets" element={<VetsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
