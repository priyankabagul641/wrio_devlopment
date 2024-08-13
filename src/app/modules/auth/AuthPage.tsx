import React, { useState } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import { Registration } from './components/Registration';
import { ForgotPassword } from './components/ForgotPassword';
import { Login } from './components/Login';
import { AuthLayout } from './AuthLayout';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleOpenRegistration = () => setIsRegistrationOpen(true);
  const handleCloseRegistration = () => setIsRegistrationOpen(false);

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login onSuccess={() => navigate('/dashboard')} />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="registration" element={<button onClick={handleOpenRegistration}>Register</button>} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
      <Registration isOpen={isRegistrationOpen} onRequestClose={handleCloseRegistration} />
    </>
  );
};

export { AuthPage };
