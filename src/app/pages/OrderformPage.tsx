import { Field, Form, Formik, ErrorMessage } from 'formik';
import clsx from 'clsx';
import { FC, useState, useEffect } from 'react';
import { Content } from '../../_metronic/layout/components/content';
import { useNavigate } from 'react-router-dom';
import { KTIcon } from '../../_metronic/helpers';

interface Profile {
  id: string;
  name: string;
  image: string;
  address: string;
  mobileNumber: string;
  gstNo: string;
  businessName: string;
  customerName: string;
  routeName: string;
  routeSequence: string;
  gstin: string;
  attachmentDoc: File | null;
  distributorId: string;
  email: string;
}

const OrderformPage: FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);

  // Retrieve profiles from session storage on component mount
  useEffect(() => {
    const storedProfiles = sessionStorage.getItem('ProfilesInfo');
    if (storedProfiles) {
      const parsedProfiles: Profile[] = JSON.parse(storedProfiles).map((profile: any, index: number) => ({
        id: index.toString(),
        name: profile['Customer Name'] || '',
        image: profile.Image || 'https://via.placeholder.com/100',
        address: profile.Address || '',
        mobileNumber: profile['Mobile Number'] || '',
        gstNo: profile.GSTIN || '',
        businessName: profile['Business Name'] || '',
        customerName: profile['Customer Name'] || '',
        routeName: profile['Route Name'] || '',
        routeSequence: profile['Route Sequence'] || '',
        gstin: profile.GSTIN || '',
        attachmentDoc: profile.Attachment || null,
        distributorId: profile['Distributor Id'] || '',
        email: profile.Email || '',
      }));
      setProfiles(parsedProfiles);
      setFilteredProfiles(parsedProfiles);
    }
  }, []);

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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    setSelectedSort(sortValue);

    const sortedProfiles = [...filteredProfiles].sort((a, b) => {
      if (sortValue === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortValue === 'address') {
        return a.address.localeCompare(b.address);
      }
      return 0;
    });

    setFilteredProfiles(sortedProfiles);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value;
    setSelectedFilter(filterValue);

    const filteredProfiles = profiles.filter((profile) => {
      if (filterValue === 'location') {
        // Replace with the actual logic for filtering by location
        return profile.routeName.includes('Location'); // Example condition
      } else if (filterValue === 'category') {
        // Replace with the actual logic for filtering by category
        return profile.businessName.includes('Category'); // Example condition
      }
      return true;
    });

    setFilteredProfiles(filteredProfiles);
  };

  const clearFilters = () => {
    setSelectedSort('');
    setSelectedFilter('');
    setFilteredProfiles(profiles); // Reset profiles to the original list
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
                    <Field
                      placeholder="Route Name"
                      className={clsx("form-control bg-transparent")}
                      type="text"
                      name="routeName"
                      autoComplete="off"
                    />
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
                  <div className="fv-row mb-8">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Select Profile</h5>
                      <button type="button" className="btn-close" onClick={closeAddUserModal}></button>
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
                      <ul className="list-group">
                        {filteredProfiles.map((profile) => (
                          <li
                            key={profile.id}
                            className={clsx(
                              'list-group-item',
                              selectedProfile === profile.id && 'active'
                            )}
                            onClick={() => setSelectedProfile(profile.id)}
                          >
                            <img src={profile.image} alt={profile.name} className="me-3" width="30" height="30" />
                            {profile.name}
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
