import { FC } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { App } from "../App"
import { PrivateRoutes } from "./PrivateRoutes"

const { BASE_URL } = import.meta.env

const AppRoutes: FC = () => {
    return (
        <BrowserRouter basename={BASE_URL}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/*" element={<PrivateRoutes />} />
                    <Route index element={<Navigate to="/private-route" />} />
                    {/* 
                    If authenticated user navigate to private routes
                    Else navigate to public/auth routes
                    */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }
