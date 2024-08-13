import { Field, Form, Formik, ErrorMessage } from 'formik';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { Content } from '../../_metronic/layout/components/content';
import { useNavigate } from 'react-router-dom';
import { KTIcon } from '../../_metronic/helpers';

const OrderformPage: FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [profiles, setProfiles] = useState([
    {
      id: '1',
      name: 'John Doe',
      image: 'https://via.placeholder.com/100',
      address: '123 Main St, Anytown',
      mobileNumber: '1234567890',
      gstNo: '12345GST',
      businessName: 'dominos',
      customerName: 'abc',
      routeName: 'nashik',
      routeSequence: '123',
      gstin: '12345GST',
      attachmentDoc: null,
      distributorId: '12',
      email: 'abc@gmail.com',
    },
    {
      id: '2',
      name: 'Jane Smith',
      image: 'https://via.placeholder.com/100',
      address: '456 Elm St, Othertown',
      mobileNumber: '0987654321',
      gstNo: '67890GST',
      businessName: 'kfc',
      customerName: '',
      routeName: 'pune',
      routeSequence: '45',
      gstin: '78954125',
      attachmentDoc: null,
      distributorId: '12',
      email: 'kfc@gmail.com',
    },
    {
      id: '3',
      name: ' Doe',
      image: 'https://via.placeholder.com/100',
      address: '123 Main St, Anytown',
      mobileNumber: '1234567890',
      gstNo: '12345GST',
    },
  ]);

  const placeOrderPage = () => {
    navigate('/PlaceOrderPage'); // Redirect to PlaceOrderPage after form submission
  };

  const openAddUserModal = () => {
    setIsModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsModalOpen(false);
    setSelectedProfile('');
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
    // Add sort logic here based on the selected value
    // e.g., sort profiles array based on the selected value
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
    // Add filter logic here based on the selected value
    // e.g., filter profiles array based on the selected value
  };

  const clearFilters = () => {
    setSelectedSort('');
    setSelectedFilter('');
    // Reset profiles or reload initial profiles
  };

  const handleSelectProfile = (setFieldValue: any) => {
    const profile = profiles.find((p) => p.id === selectedProfile);
    if (profile) {
      setFieldValue('businessName', profile.businessName || '');
      setFieldValue('customerName', profile.customerName || '');
      setFieldValue('address', profile.address || '');
      setFieldValue('mobileNumber', profile.mobileNumber || '');
      setFieldValue('routeName', profile.routeName || '');
      setFieldValue('routeSequence', profile.routeSequence || '');
      setFieldValue('gstin', profile.gstin || '');
      setFieldValue('distributorId', profile.distributorId || '');
      setFieldValue('email', profile.email || '');
      // Set other fields as necessary
    }
    closeAddUserModal();
  };

  return (
    <>
      <Formik
        initialValues={{
          businessName: '',
          customerName: '',
          address: '',
          mobileNumber: '',
          routeName: '',
          routeSequence: '',
          gstin: '',
          attachmentDoc: null,
          distributorId: '',
          email: '',
        }}
        onSubmit={(values) => {
          console.log(values);
          placeOrderPage();
        }}
      >
        {({ setFieldValue }) => (
          <Content>
            <div className="card mb-5 mb-xl-10">
              <div className="card-body pt-9 pb-0">
                <Form className="form w-100" noValidate id="kt_login_send_otp_form">
                  <div className="text-center mb-11">
                    <h1 className="text-gray-900 fw-bolder mb-3">Order Form</h1>
                  </div>
                  <button type="button" className="btn btn-secondary mb-3" onClick={openAddUserModal}>
                    <KTIcon iconName="plus" className="fs-2" />
                    Select Profile
                  </button>
                  {/* Form Fields */}
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
                    <Field as="select" name="routeName" className={clsx("form-control bg-transparent")}>
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
                    <label className="form-label fs-6 fw-bolder text-gray-900">Attachment</label>
                    <input
                      type="file"
                      className="form-control bg-transparent"
                      onChange={(event) => {
                        if (event.currentTarget.files) {
                          setFieldValue('attachmentDoc', event.currentTarget.files[0]);
                        }
                      }}
                    />
                    <ErrorMessage name="attachmentDoc" component="div" />
                  </div>
                  <div className="fv-row mb-8">
                    <label className="form-label fs-6 fw-bolder text-gray-900">Distributor ID</label>
                    <Field
                      placeholder="Distributor ID"
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
                  <div className="d-grid mb-10">
                    <button type="submit" id="kt_login_signin_form_submit_button" className="btn btn-primary">
                      <span className="indicator-label">Submit</span>
                    </button>
                  </div>
                </Form>
              </div>
            </div>
            {/* Modal for selecting profile */}
            {isModalOpen && (
              <div className="modal show d-block" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Select Profile</h5>
                      <button type="button" className="close" onClick={closeAddUserModal}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {/* Sort and filter options */}
                      <div className="mb-3">
                        <label htmlFor="sort">Sort By:</label>
                        <select id="sort" value={selectedSort} onChange={handleSortChange} className="form-control">
                          <option value="">None</option>
                          <option value="name">Name</option>
                          <option value="address">Address</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="filter">Filter By:</label>
                        <select id="filter" value={selectedFilter} onChange={handleFilterChange} className="form-control">
                          <option value="">None</option>
                          <option value="location">Location</option>
                          <option value="category">Category</option>
                        </select>
                      </div>
                      <button type="button" className="btn btn-secondary mb-3" onClick={clearFilters}>
                        Clear Filters
                      </button>
                      {/* Profile list */}
                      <ul className="list-group">
                        {profiles.map((profile) => (
                          <li
                            key={profile.id}
                            className={`list-group-item ${selectedProfile === profile.id ? 'active' : ''}`}
                            onClick={() => setSelectedProfile(profile.id)}
                          >
                            <div className="d-flex align-items-center">
                              <img src={profile.image} alt="Profile" className="rounded-circle" width="50" height="50" />
                              <div className="ms-3">
                                <h5>{profile.name}</h5>
                                <p>{profile.address}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={closeAddUserModal}>
                        Close
                      </button>
                      <button type="button" className="btn btn-primary" onClick={() => handleSelectProfile(setFieldValue)}>
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Content>
        )}
      </Formik>
    </>
  );
};

export { OrderformPage };
