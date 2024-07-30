import { FC } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'

import { MenuTestPage } from '../pages/MenuTestPage'
import { MyPage } from '../pages/MyPage'
import BuilderPageWrapper from '../pages/BuilderPageWrapper'
import { ProfilePage } from '../pages/ProfilePage'
import { ProductPage } from '../pages/ProductPage'

const PrivateRoutes: FC = () => {
  // const ProfilePage = lazy(() => import('../pages/ProfilePage'))
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='dashboard' element={<MyPage />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='*' element={<Navigate to='/dashboard' />} />
        <Route path='profilePage' element={<ProfilePage />} />
        <Route path='productPage/:id' element={<ProductPage />} />
      </Route>
    </Routes>
  )
}

export { PrivateRoutes }
