import React from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { KTIcon } from '../../../../_metronic/helpers';
import {UserRegisterIn,getUserAcccountInfo } from "../core/_requests";
import { User } from '../core/_models';
import { useNavigate } from 'react-router-dom';

interface RegistrationProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement('#root');

const Registration: React.FC<RegistrationProps> = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    appType: Yup.string().oneOf(['CU', 'RT', 'SM'], 'Role is required').required('Role is required')
  });

  const handleSubmit = async (values: { name: string; appType: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
   const no= JSON.parse(sessionStorage.getItem('email')|| '{}')

    try {
      const user: User ={
        function: 'UserLoginOrRegister',
        Uname: values.name,
        EmailId:`91${no}@deviseapps.com`,
        Image: 'http://cdn2.itpro.co.uk/sites/itpro/files/styles/article_main_wide_image/public/2018/01/android_vs_ios.jpg?itok=TsCRWKWY',
        DeviceARN: 'c4ycAOwME0Ohm5sYda1dgQ:APA91bECJKU7v4GcuGSWVG4z7xIF317w_saIdCV8Y-C0e-whXE5YlclrT8j3exai3BnkkAMSNc__iaqaBZFQVFIfT3bSlEGOdgsEAr9X9XtmQCcyXxZDXdk-WmrJapM5vq7DpToiFnr5',
        DeviceOS: 'Windows Phone',
        UserRole: values.appType,
        IsFirstTime: false
      };
console.log(user);

      const { data: loginInfo } = await UserRegisterIn(user);
      
      if (loginInfo) {
        alert('Registration successful!');
        onRequestClose();
        navigate("/dashboard");
        const userId = loginInfo.UserId;
        const { data: userAccountInfo } = await getUserAcccountInfo(userId);
        sessionStorage.setItem("CurrentUserInfo", JSON.stringify(userAccountInfo[0]));
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration.');
    }

    setSubmitting(false);
  };

  return (
    <div className="login-form">
      <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Registration Modal">
        <Formik
          initialValues={{
            name: '',
            appType: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="form w-100">
              <div className="text-center mb-11">
                <h1 className="text-gray-900 fw-bolder mb-3">Create Account</h1>
              </div>

              <div className="fv-row mb-8">
                <label className="form-label fs-6 fw-bolder text-gray-900">Name</label>
                <Field
                  type="text"
                  name="name"
                  className={clsx('form-control bg-transparent', {
                    'is-invalid': touched.name && errors.name,
                    'is-valid': touched.name && !errors.name,
                  })}
                />
                <ErrorMessage name="name" component="div" className="fv-plugins-message-container" />
              </div>

              <div className="fv-row mb-8">
                <label className="form-label fs-6 fw-bolder text-gray-900">Role</label>
                <div className="d-flex">
                  <div className="form-check me-5">
                    <Field
                      type="radio"
                      name="appType"
                      value="CU"
                      className="form-check-input"
                    />
                    <label className="form-check-label">Customer</label>
                  </div>
                  <div className="form-check me-5">
                    <Field
                      type="radio"
                      name="appType"
                      value="RT"
                      className="form-check-input"
                    />
                    <label className="form-check-label">Retailer</label>
                  </div>
                  <div className="form-check me-5">
                    <Field
                      type="radio"
                      name="appType"
                      value="SM"
                      className="form-check-input"
                    />
                    <label className="form-check-label">Salesman</label>
                  </div>
                </div>
                <ErrorMessage name="appType" component="div" className="fv-plugins-message-container" />
              </div>

              <div className="d-grid mb-10">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  <KTIcon iconName='check' className='fs-3' />
                  <span className='indicator-label'>Submit</span>
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
