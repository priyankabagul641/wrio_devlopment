import { Field, Form, Formik, ErrorMessage } from 'formik';
import clsx from 'clsx';
import { FC } from 'react';
import { Content } from '../../_metronic/layout/components/content';

const OrderformPage: FC = () => {
  return (
    <Formik
      initialValues={{
        businessName: '',
        customerName: '',
        address: '',
        mobileNumber: '',
        routeName: '',
        routeSequence: '',
        gstin: '',
        attachmentDoc: null, // File field should be initialized as null
        distributorId: '',
        email: ''
      }}
      onSubmit={(values) => {
        console.log(values);
        // Add your form submission logic here
      }}
    >
      {({ setFieldValue }) => (
         <Content>
         <div className='card mb-5 mb-xl-10'>
           <div className='card-body pt-9 pb-0'>
        <Form className="form w-100" noValidate id="kt_login_send_otp_form">
          <div className="text-center mb-11">
            <h1 className="text-gray-900 fw-bolder mb-3">Order Form</h1>
          </div>

          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">Business Name</label>
            <Field
              placeholder="Business Name"
              className={clsx("form-control bg-transparent")}
              type="text"
              name="businessName"
              autoComplete="off"
            />
            <ErrorMessage name="businessName" component="div" />
          </div>
          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">Customer Name</label>
            <Field
              placeholder="Customer Name"
              className={clsx("form-control bg-transparent")}
              type="text"
              name="customerName"
              autoComplete="off"
            />
            <ErrorMessage name="customerName" component="div" />
          </div>
          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">Address</label>
            <Field
              placeholder="Address"
              className={clsx("form-control bg-transparent")}
              type="text"
              name="address"
              autoComplete="off"
            />
            <ErrorMessage name="address" component="div" />
          </div>
          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">Mobile Number</label>
            <Field
              placeholder="Mobile Number"
              className={clsx("form-control bg-transparent")}
              type="text"
              name="mobileNumber"
              autoComplete="off"
            />
            <ErrorMessage name="mobileNumber" component="div" />
          </div>
          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">Route Name</label>
            <Field
              as="select"
              name="routeName"
              className={clsx("form-control bg-transparent")}
            >
              <option value="" label="Select route" />
              <option value="ghatkopar" label="Ghatkopar" />
              <option value="bhandup" label="Bhandup" />
              <option value="panvel" label="Panvel" />
              <option value="vikhroli" label="Vikhroli" />
              <option value="chembur" label="Chembur" />
              <option value="kurla" label="Kurla" />
              <option value="vashi" label="Vashi" />
              <option value="sanpada" label="Sanpada" />
              <option value="dadar" label="Dadar" />
            </Field>
            <ErrorMessage name="routeName" component="div" />
          </div>
          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">Route Sequence</label>
            <Field
              placeholder="Route Sequence"
              className={clsx("form-control bg-transparent")}
              type="text"
              name="routeSequence"
              autoComplete="off"
            />
            <ErrorMessage name="routeSequence" component="div" />
          </div>
          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">GSTIN</label>
            <Field
              placeholder="GSTIN"
              className={clsx("form-control bg-transparent")}
              type="text"
              name="gstin"
              autoComplete="off"
            />
            <ErrorMessage name="gstin" component="div" />
          </div>
          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">Attachment doc</label>
            <input
              id="attachmentDoc"
              name="attachmentDoc"
              type="file"
              className={clsx("form-control bg-transparent")}
              onChange={(event) => {
                const file = event.currentTarget.files && event.currentTarget.files[0];
                setFieldValue("attachmentDoc", file);
              }}
            />
            <ErrorMessage name="attachmentDoc" component="div" />
          </div>
          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">Distributor Id</label>
            <Field
              placeholder="Distributor Id"
              className={clsx("form-control bg-transparent")}
              type="text"
              name="distributorId"
              autoComplete="off"
            />
            <ErrorMessage name="distributorId" component="div" />
          </div>
          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">Email</label>
            <Field
              placeholder="Email"
              className={clsx("form-control bg-transparent")}
              type="email"
              name="email"
              autoComplete="off"
            />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className='fw-bold fs-6 text-gray-500'>By clicking on the next button, I agree to share my information to National chikki for demo and <a href="www.customer.wrio.in">www.customer.wrio.in</a> Please refer terms and conditions here</div>
          <div className="d-grid mb-10">
            <button type="submit" id="kt_send_otp_submit" className="btn btn-primary">
              Next
            </button>
          </div>
        </Form>
        </div>
        </div>
        </Content>

      )}
    </Formik>
  );
}

export { OrderformPage };
