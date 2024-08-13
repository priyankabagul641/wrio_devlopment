import { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';

import BuilderPageWrapper from '../pages/BuilderPageWrapper';
import { MenuTestPage } from '../pages/MenuTestPage';
import { ProfilePage } from '../pages/ProfilePage';
import { ProductPage } from '../pages/ProductPage';
import { OrderformPage } from '../pages/OrderformPage';
import { PlaceOrderPage } from '../pages/PlaceOrderPage';
import { Overview } from '../pages/ConfirmPage';
import { Step5 } from '../pages/ThankyouPage';
import { SettingsPage } from '../pages/SettingPage';
import { HelpPage } from '../pages/HelpPage';
import { AboutUsPage } from '../pages/AboutUs';
import { DashboardPage } from '../pages/HomePage';


const PrivateRoutes: FC = () => {
  const isAuthenticated = !!sessionStorage.getItem("CurrentUserInfo");

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="auth/login" />} />
        <Route path="builder" element={isAuthenticated ? <BuilderPageWrapper /> : <Navigate to="auth/login" />} />
        <Route path="menu-test" element={isAuthenticated ? <MenuTestPage /> : <Navigate to="auth/login" />} />
        <Route path="profilePage" element={isAuthenticated ? <ProfilePage /> : <Navigate to="auth/login" />} />
        <Route path="productPage/:id" element={isAuthenticated ? <ProductPage /> : <Navigate to="auth/login" />} />
        <Route path="orderPage" element={isAuthenticated ? <OrderformPage /> : <Navigate to="auth/login" />} />
        <Route path="PlaceOrderPage" element={isAuthenticated ? <PlaceOrderPage /> : <Navigate to="auth/login" />} />
        <Route path="ConfirmPage" element={isAuthenticated ? <Overview /> : <Navigate to="auth/login" />} />
        <Route path="ThankYou" element={isAuthenticated ? <Step5 /> : <Navigate to="auth/login" />} />
        <Route path="SettingsPage" element={isAuthenticated ? <SettingsPage /> : <Navigate to="auth/login" />} />
        <Route path="HelpPage" element={isAuthenticated ? <HelpPage /> : <Navigate to="auth/login" />} />
        <Route path="AboutUsPage" element={isAuthenticated ? <AboutUsPage /> : <Navigate to="auth/login" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
