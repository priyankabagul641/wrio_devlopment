import { FC } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'

import { MenuTestPage } from '../pages/MenuTestPage'
import { MyPage } from '../pages/MyPage'
import BuilderPageWrapper from '../pages/BuilderPageWrapper'

const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='dashboard' element={<MyPage />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Route>
    </Routes>
  )
}

export { PrivateRoutes }
