import { FC} from 'react'
import { KTIcon } from '../../_metronic/helpers'



const PlaceOrderPage: FC = () => {


  return (
    <div className="login-form">
    <div className='card mb-5 mb-xl-10 mx-4 my-2'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0 pt-3'>
        <div className='d-flex flex-wrap flex-sm-nowrap my-3'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"alt='Profile' className='rounded-circle'/>
                  {/* <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div> */}
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      abc
                      </a>
                     
                    </div>

                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                      >
                  
                       (2 abc) 
                      </a>
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                      >
                  
                     Price: 0
                      </a>
                   
                    </div>
                    <div className='d-flex align-items-center mb-2'>
                   
                   
                   <KTIcon iconName='plus-circle' className='fs-5 me-1 bg-success rounded-circle text-light' />
                 
               
                 <a
                    
                     className='d-flex align-items-center text-gray-500  text-hover-primary me-5 mb-2'
                   >
               
            100
                   </a>
               
                   <KTIcon iconName='minus-circle' className='fs-5 me-1 bg-danger rounded-circle text-light' />
                
               
                 </div>
                  </div>

               

                </div>
              </div>
            
            </div>
     
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
      <div className='my-2 mb-xl-10'>
      <div className=' m-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3 mx-4 my-2'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"alt='Profile'className='rounded-circle' />

                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      abc
                      </a>
                     
                    </div>

                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                      >
                  
                       (2 abc) 
                      </a>
                   
                    </div>
                  </div>

               

                </div>
              </div>
              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                   
                   
                      <KTIcon iconName='plus-circle' className='fs-5 me-1 bg-success rounded-circle text-light' />
                    
                  
                    <a
                       
                        className='d-flex align-items-center text-gray-500  text-hover-primary me-5 mb-2'
                      >
                  
               100
                      </a>
                  
                      <KTIcon iconName='minus-circle' className='fs-5 me-1 bg-danger rounded-circle text-light' />
                   
                  
                    </div>

                    
                  </div>

               

                </div>
              </div>
            </div>
     
        </div>
        </div>
      </div>

    

    </div>
      <div className="d-grid mb-10">
      <button type="submit" id="kt_send_otp_submit" className="btn btn-primary">
       Checkout
      </button>
    </div>
    </div>
  )
}

export {PlaceOrderPage}
