import { KTIcon } from "../../_metronic/helpers";
import { Content } from "../../_metronic/layout/components/content";





const AboutUsPage = ()=>{
    return(<div>
        <Content>
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  <img src='assets/imgs/wrio-logo.png' alt='Profile' />
                  
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      Version 18
                      </a>
                      <a href='#'>
                        <KTIcon iconName='verify' className='fs-1 text-primary' />
                      </a>
                    </div>

                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      <a
                        href='http://www.wrio.in/'
                        className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                      >
                        <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                        http://www.wrio.in/
                      </a>
                   
                    </div>
                  </div>

                 

                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>)
};

export { AboutUsPage };