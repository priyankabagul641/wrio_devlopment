import { FC } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { App } from "../App"
import { Logout } from "../modules/auth"
import { AuthPage } from "../modules/auth/AuthPage"
import { PrivateRoutes } from "./PrivateRoutes"
import {  useAuth } from "../modules/auth"
import { ErrorsPage } from "../modules/errors/ErrorsPage"

const { BASE_URL } = import.meta.env

const AppRoutes: FC = () => {
  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='logout' element={<Logout />} />
          <Route path='auth/*' element={<AuthPage />} />
          <Route path='/*' element={<PrivateRoutes />} />
          <Route path='*' element={<Navigate to='/auth' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }
