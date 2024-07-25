import  { FC, useEffect, useState } from 'react'
import { KTIcon} from '../../_metronic/helpers'
import { ToolbarWrapper } from '../../_metronic/layout/components/toolbar'
import { Content } from '../../_metronic/layout/components/content'
import { UserModel } from '../modules/auth'

const ProfilePage: FC = () => {
  const [userInfo, setUserInfo] = useState<UserModel | null>(null)

  useEffect(() => {
    const storedUserInfo = sessionStorage.getItem('CurrentUserInfo')
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo))
    }
  }, [])

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
                    {/* <a href='#' className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
                      <KTIcon iconName='check' className='fs-3 d-none' />

                      <span className='indicator-label'>Follow</span>
                      <span className='indicator-progress'>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    </a> */}
                    <a
                      href='#'
                      className='btn btn-sm btn-primary me-3'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_offer_a_deal'
                    >
                     Logout
                    </a>
                  
                  </div>

                </div>

                <div className='d-flex flex-wrap flex-stack'>
                  <div className='d-flex flex-column flex-grow-1 pe-8'>
                    <div className='d-flex flex-wrap'>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                          <div className='fs-2 fw-bolder'>4500$</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-500'>Earnings</div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-down' className='fs-3 text-danger me-2' />
                          <div className='fs-2 fw-bolder'>75</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-500'>Projects</div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                          <div className='fs-2 fw-bolder'>60%</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-500'>Success Rate</div>
                      </div>
                    </div>
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
