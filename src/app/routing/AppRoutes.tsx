import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { PrivateRoutes } from "./PrivateRoutes";
import {Logout, AuthPage, useAuth} from '../modules/auth'
const { BASE_URL } = import.meta.env;

const AppRoutes: FC = () => {
    const {currentUser} = useAuth()
  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
      <Route element={<App />}>
       
      
          <Route path='logout' element={<Logout />} />
       
          {currentUser ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/mypage" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
