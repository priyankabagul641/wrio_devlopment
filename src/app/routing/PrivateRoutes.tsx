import { Route, Routes } from "react-router-dom"
import { MyPage } from "../pages/MyPage"

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/private-route" element={<MyPage />} />
        </Routes>
    )
}

export { PrivateRoutes }