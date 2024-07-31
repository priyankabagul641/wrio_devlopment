import {FC} from 'react'
import {KTIcon} from '../../_metronic/helpers'


const Step5: FC = () => {
  return (
    <div className='w-75 py-5 px-5 mx-5'>
      <div className='pb-8 pb-lg-10'>
        <h2 className='fw-bolder text-gray-900'>Your Are Done!</h2>

        <div className='text-gray-500 fw-bold fs-6'>
         Order placed successfully !
        </div>
      </div>

      <div className='mb-0'>
        <div className='fs-6 text-gray-600 mb-5'>
        Business name : National Chikki For Demo
        </div>

        <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
          <KTIcon iconName='information-5' className='fs-2tx text-warning me-4' />
          <div className='d-flex flex-stack flex-grow-1'>
            <div className='fw-bold'>
              <h4 className='text-gray-800 fw-bolder'>Your Order(s)</h4>
              <div className='fs-6 text-gray-600'>
               Order No
                <a  className='fw-bolder ms-3'>
                 2024
                </a>
              </div>
              <div className='fs-6 text-gray-600'>
             Amount
                <a  className='fw-bolder ms-3'>
                 524
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex my-4'>
                    <a href='#' className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
                      <KTIcon iconName='check' className='fs-3 d-none' />

                      <span className='indicator-label'>Save Profile</span>
                      
                    </a>
                    <a
                    
                      className='btn btn-sm btn-primary me-3'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_offer_a_deal'
                    >
                    Home
                    </a>
                 
                  
                  </div>
    </div>
  )
}

export {Step5}
