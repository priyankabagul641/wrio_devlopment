import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';

import { useFormik } from 'formik';
import {  sendOtp, verifyOtp } from '../core/_requests';
import { useNavigate } from 'react-router-dom';


const mobileSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Minimum 10 digits')
    .max(10, 'Maximum 10 digits')
    .required('Mobile number is required'),
});

const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(4, 'Minimum 4 digits')
    .max(4, 'Maximum 4 digits')
    .required('OTP is required'),
});

const initialMobileValues = {
  mobile: '',
};

const initialOtpValues = {
  otp: '',
};

export function Login() {

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const formikMobile = useFormik({
    initialValues: initialMobileValues,
    validationSchema: mobileSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        await sendOtp(values.mobile);
        console.log(values.mobile);
        
        setMobile(values.mobile);
        setOtpSent(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setStatus('Failed to send OTP. Please try again.');
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const formikOtp = useFormik({
    initialValues: initialOtpValues,
    validationSchema: otpSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data:auth} = await verifyOtp( values.otp,mobile);
        console.log(auth);
        navigate('/dashboard'); 
        
      } catch (error) {
        console.error(error);
    
        setStatus('OTP verification failed. Please try again.');
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <div className='login-form'>
      {!otpSent ? (
        <form
          className='form w-100'
          onSubmit={formikMobile.handleSubmit}
          noValidate
          id='kt_login_send_otp_form'
        >
          <div className='text-center mb-11'>
            <h1 className='text-gray-900 fw-bolder mb-3'>Sign In</h1>
          </div>

          <div className='fv-row mb-8'>
            <label className='form-label fs-6 fw-bolder text-gray-900'>Mobile Number</label>
            <input
              placeholder='Mobile Number'
              {...formikMobile.getFieldProps('mobile')}
              className={clsx(
                'form-control bg-transparent',
                { 'is-invalid': formikMobile.touched.mobile && formikMobile.errors.mobile },
                { 'is-valid': formikMobile.touched.mobile && !formikMobile.errors.mobile }
              )}
              type='text'
              name='mobile'
              autoComplete='off'
            />
            {formikMobile.touched.mobile && formikMobile.errors.mobile && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formikMobile.errors.mobile}</span>
              </div>
            )}
          </div>

          <div className='d-grid mb-10'>
            <button
              type='submit'
              id='kt_send_otp_submit'
              className='btn btn-primary'
              disabled={formikMobile.isSubmitting || !formikMobile.isValid}
            >
              {!loading && <span className='indicator-label'>Send OTP</span>}
              {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      ) : (
        <form
          className='form w-100'
          onSubmit={formikOtp.handleSubmit}
          noValidate
          id='kt_login_verify_otp_form'
        >
          <div className='text-center mb-11'>
            <h1 className='text-gray-900 fw-bolder mb-3'>Verify OTP</h1>
          </div>

          <div className='fv-row mb-8'>
            <label className='form-label fs-6 fw-bolder text-gray-900'>OTP</label>
            <input
              placeholder='OTP'
              {...formikOtp.getFieldProps('otp')}
              className={clsx(
                'form-control bg-transparent',
                { 'is-invalid': formikOtp.touched.otp && formikOtp.errors.otp },
                { 'is-valid': formikOtp.touched.otp && !formikOtp.errors.otp }
              )}
              type='text'
              name='otp'
              autoComplete='off'
            />
            {formikOtp.touched.otp && formikOtp.errors.otp && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formikOtp.errors.otp}</span>
              </div>
            )}
          </div>

          <div className='d-grid mb-10'>
            <button
              type='submit'
              id='kt_verify_otp_submit'
              className='btn btn-primary'
              disabled={formikOtp.isSubmitting || !formikOtp.isValid}
            >
              {!loading && <span className='indicator-label'>Verify OTP</span>}
              {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>

          <div className='text-gray-500 text-center fw-semibold fs-6'>
            Didn't receive OTP?{' '}
            <button
              type='button'
              className='link-primary'
              onClick={() => {
                setOtpSent(false);
                setMobile('');
              }}
            >
              Resend
            </button>
          </div>
        </form>
      )}

   
    </div>
  );
}