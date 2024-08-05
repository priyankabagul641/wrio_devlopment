import { FC } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'

import { MenuTestPage } from '../pages/MenuTestPage'
import { DashboardPage } from '../pages/MyPage'
import BuilderPageWrapper from '../pages/BuilderPageWrapper'
import { ProfilePage } from '../pages/ProfilePage'
import { ProductPage } from '../pages/ProductPage'
import { OrderformPage } from '../pages/OrderformPage'
import { PlaceOrderPage } from '../pages/PlaceOrderPage'
import { Overview } from '../pages/ConfirmPage'
import { Step5 } from '../pages/ThankyouPage'
import { SettingsPage } from '../pages/SettingPage'
import { HelpPage } from '../pages/HelpPage'
import { AboutUsPage } from '../pages/AboutUs'

const PrivateRoutes: FC = () => {
  // const ProfilePage = lazy(() => import('../pages/ProfilePage'))
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='*' element={<Navigate to='/dashboard' />} />
        <Route path='profilePage' element={<ProfilePage />} />
        <Route path='productPage/:id' element={<ProductPage />} />
        <Route path='orderPage' element={<OrderformPage />} />
        <Route path='PlaceOrderPage' element={<PlaceOrderPage />} />
        <Route path='ConfirmPage' element={<Overview />} />
        <Route path='ThankYou' element={<Step5 />} />
        <Route path='SettingsPage' element={<SettingsPage />} />
        <Route path='HelpPage' element={<HelpPage />} />
        <Route path='AboutUsPage' element={<AboutUsPage />} />
      </Route>
    </Routes>
  )
}

export { PrivateRoutes }
