import { FC, useEffect, useState } from 'react'
import { KTIcon } from '../../_metronic/helpers'
import { ToolbarWrapper } from '../../_metronic/layout/components/toolbar'
import { Content } from '../../_metronic/layout/components/content'

import {deleteProfile} from '../modules/auth/core/_requests'
import { useNavigate } from 'react-router-dom'
import { UserModel } from '../modules/auth'

// const deleteProfile = (userId: any, Id: any) => {
//   const url = `https://api.checkmeinweb.com/APIv2/APIv2/ClientFunctions.php?function=DeleteProfile&UserId=${userId}&Id=${Id}`;
//   return axios.delete(url);
// };

const ProfilePage: FC = () => {
  const [userInfo, setUserInfo] = useState<UserModel | null>(null)
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = sessionStorage.getItem('CurrentUserInfo')
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo))
    }
  }, [])

  const handleDeleteProfile = async () => {
    if (userInfo) {
      try {
        await deleteProfile(userInfo.UserId, userInfo._id.$id);
        sessionStorage.clear();
        alert('Profile deleted successfully');
        navigate('/auth/login'); // Redirect to login page after deletion
      } catch (error) {
        console.error('Error deleting profile:', error);
    alert('Failed to delete profile');
      }
    }
  }

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/auth/login'); // Redirect to login page after logout
  }

  if (!userInfo) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  <img src={userInfo.Image} alt='Profile' />
                  <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                        {userInfo.UserName}
                      </a>
                      <a href='#'>
                        <KTIcon iconName='verify' className='fs-1 text-primary' />
                      </a>
                    </div>

                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                      >
                        <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                        {userInfo.UserRole}
                      </a>
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                      >
                        <KTIcon iconName='geolocation' className='fs-4 me-1' />
                        {userInfo.DeviceOS}
                      </a>
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-500 text-hover-primary mb-2'
                      >
                        <KTIcon iconName='sms' className='fs-4 me-1' />
                        {userInfo.EmailId}
                      </a>
                    </div>
                  </div>

                  <div className='d-flex my-4'>
                    <button onClick={handleDeleteProfile} className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
                      <KTIcon iconName='check' className='fs-3 d-none' />
                      <span className='indicator-label'>Delete</span>
                      <span className='indicator-progress'>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    </button>
                    <button onClick={handleLogout} className='btn btn-sm btn-primary me-3'>
                      Logout
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export { ProfilePage }
