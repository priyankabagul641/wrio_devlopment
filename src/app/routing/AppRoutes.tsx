import { FC } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { App } from "../App";
import { Logout } from "../modules/auth";
import { AuthPage } from "../modules/auth/AuthPage";
import { PrivateRoutes } from "./PrivateRoutes";

const { BASE_URL } = import.meta.env;

const AppRoutes: FC = () => {
  // Check if the user is authenticated from session storage
  const isAuthenticated = !!sessionStorage.getItem("CurrentUserInfo");

  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : 'auth/login'} />} />
          <Route path="logout" element={<Logout />} />
          <Route path="auth/*" element={<AuthPage />} />
          <Route path="*" element={isAuthenticated ? <PrivateRoutes /> : <Navigate to="auth/login" />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "auth/login"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
