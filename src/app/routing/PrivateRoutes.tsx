import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { MasterLayout } from "../../_metronic/layout/NewMasterLayout"

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MasterLayout />}>
                {/* redirect to home on successfull login */}
                <Route path='auth/*' element={<Navigate to='/home' />} />
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    )
}

export { PrivateRoutes }