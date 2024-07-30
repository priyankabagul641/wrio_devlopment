import React from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { KTIcon } from '../../../../_metronic/helpers';

interface RegistrationProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement('#root');

const Registration: React.FC<RegistrationProps> = ({ isOpen, onRequestClose }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    appType: Yup.string().oneOf([
      'Customer',
      'Retailer',
      'Salesman'
    ], 'Role is required').required('Role is required')
  });

  return (
    <div className="login-form">
       <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Registration Modal">
       <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={onRequestClose} >
          <KTIcon className='fs-1' iconName='cross' />
        </div>
        <Formik
          initialValues={{ name: '', appType: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            onRequestClose(); // Close the modal on submit
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="form w-100" noValidate id="kt_login_send_otp_form">
              <div className="text-center mb-11">
                <h1 className="text-gray-900 fw-bolder mb-3">Sign Up</h1>
              </div>
            

      

              <div className="fv-row mb-8">
                <label className="form-label fs-6 fw-bolder text-gray-900">Name</label>
                <Field
                  placeholder="Name"
                  className={clsx("form-control bg-transparent")}
                  type="text"
                  name="name"
                  autoComplete="off"
                />
                <ErrorMessage name="name" component="div"  />
              </div>

              <div className='fv-row'>
                {/* begin::Label */}
                <label className='d-flex align-items-center fs-5 fw-semibold mb-4'>
                  <span className='required'>Category</span>

                  <i
                    className='fas fa-exclamation-circle ms-2 fs-7'
                    data-bs-toggle='tooltip'
                    title='Select your app category'
                  ></i>
                </label>
                {/* end::Label */}
                <div>
                  {/* begin::Option */}
                  <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                    <span className='d-flex align-items-center me-2'>
                      <span className='symbol symbol-50px me-6'>
                        <span className='symbol-label bg-light-primary'>
                          <KTIcon iconName='compass' className='fs-1 text-primary' />
                        </span>
                      </span>

                      <span className='d-flex flex-column'>
                        <span className='fw-bolder fs-6'>Customer</span>
                       
                      </span>
                    </span>

                    <span className='form-check form-check-custom form-check-solid'>
                      <Field
                        type='radio'
                        name='appType'
                        value='Customer'
                        checked={values.appType === 'Customer'}
                        onChange={() => setFieldValue('appType', 'Customer')}
                        className='form-check-input'
                      />
                    </span>
                  </label>
                  {/* end::Option */}

                  {/* begin::Option */}
                  <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                    <span className='d-flex align-items-center me-2'>
                      <span className='symbol symbol-50px me-6'>
                        <span className='symbol-label bg-light-danger'>
                          <KTIcon iconName='category' className='fs-1 text-danger' />
                        </span>
                      </span>

                      <span className='d-flex flex-column'>
                        <span className='fw-bolder fs-6'>Retailer</span>
                     
                      </span>
                    </span>

                    <span className='form-check form-check-custom form-check-solid'>
                      <Field
                        type='radio'
                        name='appType'
                        value='Retailer'
                        checked={values.appType === 'Retailer'}
                        onChange={() => setFieldValue('appType', 'Retailer')}
                        className='form-check-input'
                      />
                    </span>
                  </label>
                  {/* end::Option */}

                  {/* begin::Option */}
                  <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                    <span className='d-flex align-items-center me-2'>
                      <span className='symbol symbol-50px me-6'>
                        <span className='symbol-label bg-light-success'>
                          <KTIcon iconName='timer' className='fs-1 text-success' />
                        </span>
                      </span>

                      <span className='d-flex flex-column'>
                        <span className='fw-bolder fs-6'>Salesman</span>
                  
                      </span>
                    </span>

                    <span className='form-check form-check-custom form-check-solid'>
                      <Field
                        type='radio'
                        name='appType'
                        value='Salesman'
                        checked={values.appType === 'Salesman'}
                        onChange={() => setFieldValue('appType', 'Salesman')}
                        className='form-check-input'
                      />
                    </span>
                  </label>
                  {/* end::Option */}
                </div>
                <ErrorMessage name="appType" component="div" />
              </div>

              <div className="d-grid mb-10">
                <button type="submit" id="kt_send_otp_submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export { Registration };
