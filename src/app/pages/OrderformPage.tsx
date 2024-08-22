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

const defaultProfileId = '0'; // Default profile id; adjust as needed

const OrderformPage: FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);

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
      
      // Set default profile
      const defaultProfile = parsedProfiles.find(profile => profile.id === defaultProfileId);
      if (defaultProfile) {
        setSelectedProfile(defaultProfile);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedProfile) {
      // Automatically populate the form fields with the selected profile values
    }
  }, [selectedProfile]);

  const getDefaultValues = () => {
    if (selectedProfile) {
      return {
        businessName: selectedProfile.businessName || '',
        customerName: selectedProfile.customerName || '',
        address: selectedProfile.address || '',
        mobileNumber: selectedProfile.mobileNumber || '',
        routeName: selectedProfile.routeName || '',
        routeSequence: selectedProfile.routeSequence || '',
        gstin: selectedProfile.gstin || '',
        attachmentDoc: selectedProfile.attachmentDoc || null,
        distributorId: selectedProfile.distributorId || '',
        email: selectedProfile.email || '',
      };
    }
    return {
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
    };
  };

  const handleSelectProfile = (setFieldValue: any) => {
    if (selectedProfile) {
      setFieldValue('businessName', selectedProfile.businessName || '');
      setFieldValue('customerName', selectedProfile.customerName || '');
      setFieldValue('address', selectedProfile.address || '');
      setFieldValue('mobileNumber', selectedProfile.mobileNumber || '');
      setFieldValue('routeName', selectedProfile.routeName || '');
      setFieldValue('routeSequence', selectedProfile.routeSequence || '');
      setFieldValue('gstin', selectedProfile.gstin || '');
      setFieldValue('distributorId', selectedProfile.distributorId || '');
      setFieldValue('email', selectedProfile.email || '');
    }
    setIsModalOpen(false);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;

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

    const filteredProfiles = profiles.filter((profile) => {
      if (filterValue === 'location') {
        return profile.routeName.includes('Location'); 
      } else if (filterValue === 'category') {
        return profile.businessName.includes('Category'); 
      }
      return true;
    });

    setFilteredProfiles(filteredProfiles);
  };

  const clearFilters = () => {
    setFilteredProfiles(profiles);
  };

  return (
    <>
      <Formik
        initialValues={getDefaultValues()}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log(values);
          navigate('/PlaceOrderPage');
        }}
      >
        {({ setFieldValue }) => (
          <Content>
            <div className="card mb-5 mb-xl-10">
              <div className="card-body pt-9 pb-0">
                <Form className="form w-100" noValidate>
                  <div className="text-center mb-11">
                    <h1 className="text-gray-900 fw-bolder mb-3">Order Form</h1>
                  </div>
                  <button type="button" className="btn btn-secondary mb-3" onClick={() => setIsModalOpen(true)}>
                    <KTIcon iconName="plus" className="fs-2" />
                    Select Profile
                  </button>

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
                  <div className="fv-row mb-8">
                    <label className="form-label fs-6 fw-bolder text-gray-900">Attachment Document</label>
                    <input
                      className={clsx("form-control bg-transparent")}
                      type="file"
                      name="attachmentDoc"
                      onChange={(e) => setFieldValue('attachmentDoc', e.target.files ? e.target.files[0] : null)}
                    />
                  </div>
                  <button type="submit" className="btn btn-lg btn-primary w-100 mb-5">
                    Submit
                  </button>
                </Form>
              </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="modal d-block" tabIndex={-1}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Select Profile</h5>
                      <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="sort" className="form-label">Sort by:</label>
                        <select id="sort" className="form-select" onChange={handleSortChange}>
                          <option value="name">Name</option>
                          <option value="address">Address</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="filter" className="form-label">Filter by:</label>
                        <select id="filter" className="form-select" onChange={handleFilterChange}>
                          <option value="">None</option>
                          <option value="location">Location</option>
                          <option value="category">Category</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <button type="button" className="btn btn-secondary" onClick={clearFilters}>Clear Filters</button>
                      </div>
                      <div className="list-group">
                        {filteredProfiles.map((profile) => (
                          <button
                            key={profile.id}
                            type="button"
                          
                            className={`list-group-item list-group-item-action ${profile.id === defaultProfileId ? 'active' : ''}`}
                            onClick={() => {
                              setSelectedProfile(profile);
                              handleSelectProfile(setFieldValue);
                            }}
                          >
                            <div className="d-flex w-100 justify-content-between">
                              <h5 className="mb-1">{profile.name}</h5>
                              <small>{profile.address}</small>
                            </div>
                            <p className="mb-1">{profile.businessName}</p>
                            <small>{profile.mobileNumber}</small>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>
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
