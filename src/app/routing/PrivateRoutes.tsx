import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
        </Routes>
    )
}

export { PrivateRoutes }