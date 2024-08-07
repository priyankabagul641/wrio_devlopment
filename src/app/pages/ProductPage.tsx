import { FC, useEffect, useState } from 'react';
import { KTIcon } from '../../_metronic/helpers';
import { ToolbarWrapper } from '../../_metronic/layout/components/toolbar';
import { Content } from '../../_metronic/layout/components/content';
import { UserModel } from '../modules/auth';
import { getProductById } from '../modules/auth/core/_requests';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

interface Product {
  TerminalName: string;
  Image: any;
  BusinessDescription: string;
  WebLink: string;
  OrderEmails: any;
  FT: string;
  AllowNoOrder: boolean;
  SalesBeatCollection: boolean;
   Sections?: any[]; 
}

const ProductPage: FC = () => {
  const [userInfo, setUserInfo] = useState<UserModel | null>(null);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError('Invalid product ID');
      setLoading(false);
      return;
    }
    setLoading(true);
    getProductById(id)
      .then((response: AxiosResponse<Product>) => {
        setProduct(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('An error occurred while fetching product details.');
        setLoading(false);
      });
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const goToOrderForm = (markNoOrder: boolean) => {
    if (product.FT === 'ST' || product.FT === 'SS' || (product.FT === 'ER' && product.Sections && product.Sections.length > 0)) {
      navigate('/orderPage', { state: { markNoOrder } });
    } else {
      navigate('/orderPage', { state: { markNoOrder } });
    }
  };

  const openSyncMyBeat = () => {
    // Implement your logic to load sales beat here
    console.log('Loading Sales Beat');
  };

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  <img src={product.Image} alt='Profile' />
                  <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <a className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                        {product.TerminalName}
                      </a>
                      <a>
                        <KTIcon iconName='verify' className='fs-1 text-primary' />
                      </a>
                    </div>
                  </div>

                  <div className='d-flex my-4'>
                    {product.FT === 'CO' && (
                      <button
                        onClick={() => goToOrderForm(true)}
                        className='btn btn-sm btn-primary me-3'
                      >
                        Send Enquiry
                      </button>
                    )}

                    {product.FT !== 'CO' && product.FT !== 'ER' && product.FT !== 'DO' && product.FT !== 'AA' && (
                      <button
                        onClick={() => goToOrderForm(false)}
                        className='btn btn-sm btn-primary me-3'
                      >
                        Order Here
                      </button>
                    )}

                    {product.FT === 'ER' && (
                      <button
                        onClick={() => goToOrderForm(true)}
                        className='btn btn-sm btn-primary me-3'
                      >
                        Register
                      </button>
                    )}

                    {userInfo?.UserRole === 'SM' && product.AllowNoOrder && (
                      <button
                        onClick={() => goToOrderForm(true)}
                        className='btn btn-sm btn-light me-2'
                      >
                        Mark No Order
                      </button>
                    )}

                    {userInfo?.UserRole === 'SM' && product.SalesBeatCollection && (
                      <button
                        onClick={openSyncMyBeat}
                        className='btn btn-sm btn-primary me-3'
                      >
                        Load Sales Beat
                      </button>
                    )}

                    {(product.FT === 'DO' || product.FT === 'AA') && (
                      <button
                        onClick={() => goToOrderForm(true)}
                        className='btn btn-sm btn-primary me-3'
                      >
                        Book Appointment
                      </button>
                    )}
                  </div>
                </div>

                <div className='d-flex flex-wrap flex-stack'>
                  <div className='d-flex flex-column flex-grow-1 pe-8'>
                    <div className='d-flex flex-wrap'>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>Product description</div>
                        </div>
                        <div className='fw-bold fs-6 text-gray-500'>{product.BusinessDescription}</div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-down' className='fs-3 text-danger me-2' />
                          <div className='fs-2 fw-bolder'>Website</div>
                        </div>
                        <div className='fw-bold fs-6 text-gray-500'>{product.WebLink}</div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                          <div className='fs-2 fw-bolder'>Email Id</div>
                        </div>
                        <div className='fw-bold fs-6 text-gray-500'>{product.OrderEmails}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export { ProductPage };
