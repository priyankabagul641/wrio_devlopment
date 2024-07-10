
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'

import { MyPage } from '../pages/MyPage'


const PrivateRoutes = () => {


  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/mypage' />} />
        {/* Pages */}
        <Route path='mypage' element={<MyPage />} />
    
        {/* Lazy Modules */}
     
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}



export {PrivateRoutes}
