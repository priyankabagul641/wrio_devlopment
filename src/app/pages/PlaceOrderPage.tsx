import React, { FC, useEffect, useState } from 'react';
import { KTIcon } from '../../_metronic/helpers';
import { useNavigate } from 'react-router-dom';

interface Section {
  _id: { $id: string };
  SectionName: string;
  Image: string;
}

const PlaceOrderPage: FC = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>([]);
  const [comment, setComment] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [terminal, setTerminal] = useState({
    AskComment: 'Y',
    CommentMessage: 'Would you like to leave a comment?',
    OrderAssure: true,
    OrderAssureMessage: 'Do you assure this order?',
    FT: 'AA',
  });
  useEffect(() => {
  
    const storedSectionData = sessionStorage.getItem('SectionsData');
    if (storedSectionData) {
      const parsedSectionData = JSON.parse(storedSectionData);
      setSections(parsedSectionData);
    }
  }, []);
  const showZeroItemMessage = () => {
    if (sections.length === 0) {
      alert('Payment Amount Should not be 0');
    } else {
      sessionStorage.setItem('SectionItem', JSON.stringify(sections));
      if (terminal.FT === 'AA') {
        navigate('/BookAppointmentPage');
      } else if (terminal.FT === 'ST' || terminal.FT === 'ER' || terminal.FT === 'SS') {
        navigate('/OrderFormPage', { state: { MarkNoOrder: false } });
      } else {
        navigate('/ConfirmPage');
      }
    }
  };
  const handleCheckout = () => {
    if (!isConnected) {
      alert('No internet connection');
    } else {
      if (terminal.AskComment === 'Y') {
        const userConfirmed = window.confirm(terminal.CommentMessage);
        if (userConfirmed) {
          const userComment = prompt('Enter your comment here:');
          setComment(userComment || '');
          if (terminal.OrderAssure) {
            showAssureMessage();
          } else {
            showZeroItemMessage();
          }
        } else {
          if (terminal.OrderAssure) {
            showAssureMessage();
          } else {
            showZeroItemMessage();
          }
        }
      } else {
        showZeroItemMessage();
      }
    }
  };

  const showAssureMessage = () => {
    if (window.confirm(terminal.OrderAssureMessage)) {
      showZeroItemMessage();
    }
  };
  const confirmPage = () => {
    navigate('/ConfirmPage');
  };

  return (
    <div className="login-form">
      {sections.map((section) => (
        <div key={section._id.$id} className="card mb-5 mb-xl-10 mx-4 my-2">
          <div
            className="card-header border-0 cursor-pointer"
            role="button"
            data-bs-toggle="collapse"
            data-bs-target={`#section-${section._id.$id}`}
            aria-expanded="true"
            aria-controls={`section-${section._id.$id}`}
          >
            <div className="card-title m-0 pt-3">
              <div className="d-flex flex-wrap flex-sm-nowrap my-3">
                <div className="me-7 mb-4">
                  <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                    <img
                      src={section.Image}
                      alt={section.SectionName}
                      className=""
                    />
                  </div>
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                        >
                          {section.SectionName}
                        </a>
                      </div>

                      <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                        <a
                          href="#"
                          className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                        >
                          (2 abc)
                        </a>
                        <a
                          href="#"
                          className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                        >
                          Price: 0
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id={`section-${section._id.$id}`} className="collapse show">
            <div className="my-2 mb-xl-10">
              <div className="m-0">
                <div className="d-flex flex-wrap flex-sm-nowrap mb-3 mx-4 my-2">
                  <div className="me-7 mb-4">
                    <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Profile"
                        className="rounded-circle"
                      />
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center mb-2">
                          <a
                            href="#"
                            className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                          >
                            abc
                          </a>
                        </div>

                        <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                          <a
                            href="#"
                            className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                          >
                            (2 abc)
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center mb-2">
                          <KTIcon
                            iconName="plus-circle"
                            className="fs-5 me-1 bg-success rounded-circle text-light"
                          />

                          <a
                            className="d-flex align-items-center text-gray-500  text-hover-primary me-5 mb-2"
                          >
                            100
                          </a>

                          <KTIcon
                            iconName="minus-circle"
                            className="fs-5 me-1 bg-danger rounded-circle text-light"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_send_otp_submit"
          className="btn btn-primary"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export { PlaceOrderPage };
