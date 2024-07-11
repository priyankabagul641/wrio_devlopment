import { FC } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { App } from "../App"
import { PrivateRoutes } from "./PrivateRoutes"
import { AuthPage, Logout, useAuth } from "../modules/auth"
import { ErrorsPage } from "../modules/errors/ErrorsPage"

const { BASE_URL } = import.meta.env

const AppRoutes: FC = () => {
    const { currentUser } = useAuth()
    // console.log(currentUser)
    return (
        <BrowserRouter basename={BASE_URL}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path='error/*' element={<ErrorsPage />} />
                    <Route path='logout' element={<Logout />} />
                    {currentUser ? (
                        <>
                            <Route path="/*" element={<PrivateRoutes />} />
                            <Route index element={<Navigate to="/home" />} />
                        </>
                    ) : (
                        <>
                            <Route path='auth/*' element={<AuthPage />} />
                            <Route path='*' element={<Navigate to='/auth' />} />
                        </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }
