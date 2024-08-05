import { useNavigate} from 'react-router-dom'

import { Content } from '../../_metronic/layout/components/content'

export function Overview() {
  const navigate = useNavigate();
  const thankyoupage = () => {

    navigate('/ThankYou'); 
  }
  return (
    <Content>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'> Details</h3>
          </div>

          <button type="submit" id="kt_send_otp_submit"  className='btn btn-primary align-self-center' onClick={thankyoupage}>
           Confirm
          </button>
        </div>

        <div className='card-body p-9'>
        <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Check In Time</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>31 july 2024</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Business Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>Max Smith</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Customer Name</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>Keenthemes</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Address</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>Nashik</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Route Name</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>dadar</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>route Sequence</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>25</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>GSTIN</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>123456258</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Distributor Id</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>D-45</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Contact Phone
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>044 3276 454 935</span>

              <span className='badge badge-success'>Verified</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8'>
              <a href='#' className='fw-bold fs-6 text-gray-900 text-hover-primary'>
                keenthemes@gmail.com
              </a>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Attachment
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Country of origination'
              ></i>
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>File</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Products</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>Cheese Ball</span>
            </div>
          </div>

       

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> Total</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>123</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Total Items</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>1</span>
            </div>
          </div>
        </div>
      </div>

     
    </Content>
  )
}
