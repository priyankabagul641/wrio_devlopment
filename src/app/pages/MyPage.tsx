import { FC, useEffect, useState } from 'react';
import { ToolbarWrapper } from '../../_metronic/layout/components/toolbar';
import { Content } from '../../_metronic/layout/components/content';

import { getAll, getUserProducts } from '../modules/auth/core/_requests';
import { Link } from 'react-router-dom';

interface Terminal {
  WrioCode: string;
  Image: string;
  badgeColor: string;
  Status: string;
  statusColor: string;
  TerminalName: string;
  Description: string;
  date: string;
  budget: string;
  TermType: string;
  progress: number;
}

interface UserAccount {
  UserRole: string;
  UserId: number;
}

const DashboardPage: FC = () => {
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);

  const userAccount: UserAccount = JSON.parse(sessionStorage.getItem('CurrentUserInfo') || '{}');

  const fetchTerminals = async () => {
    setLoading(true);
    try {
      let filteredTerminals: Terminal[] = [];
      if (userAccount.UserRole === 'CU') {
        const response = await getAll();
        console.log('All terminals response:', response);

        filteredTerminals = response.data.filter(
          (terminal: Terminal) => terminal.Status === 'ON' && terminal.TermType !== 'BB'
        );
        console.log('Filtered terminals for CU:', filteredTerminals);
        
        setTerminals(filteredTerminals);
        setHidden(true);
      } else {
        const response = await getUserProducts(userAccount.UserId);
        console.log('User products response:', response);

        filteredTerminals = response.data.filter(
          (terminal: Terminal) => terminal.Status === 'ON'
        );
        console.log('Filtered terminals for non-CU:', filteredTerminals);

        setTerminals(filteredTerminals);
      }
    } catch (error) {
      console.error('Failed to fetch terminals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerminals();
  }, []); 

  if (loading) {
    return <div>Please wait...</div>;
  }

  return (
    <>
      <ToolbarWrapper />
      <Content>
        {/* begin::Row */}
        <div className='row g-6 g-xl-9'>
          {terminals.map((product) => (
            <div className='col-md-6 col-xl-4' key={product.WrioCode}>
              <Link to='/crafted/pages/profile/overview' className='card border border-2 border-gray-300 border-hover'>
                <div className='card-header border-0 pt-9'>
                  <div className='card-title m-0'>
                    <div className='symbol symbol-50px w-50px bg-light'>
                      <img src={product.Image} alt={product.TerminalName} className='p-3' />
                    </div>
                  </div>

                  {/* <div className='card-toolbar'>
                    <span className={`badge badge-light-${product.badgeColor} fw-bolder me-auto px-4 py-3`}>
                      {product.Status}
                    </span>
                  </div> */}
                </div>

                <div className='card-body p-9'>
                  <div className='fs-3 fw-bolder text-gray-900'>{product.TerminalName}</div>

                  <p className='text-gray-500 fw-bold fs-5 mt-1 mb-7'>{product.Description}</p>

                  <div className='d-flex flex-wrap mb-5'>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3'>
                      <div className='fs-6 text-gray-800 fw-bolder'>20 July 2024</div>
                      <div className='fw-bold text-gray-500'>Due Date</div>
                    </div>

                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3'>
                      <div className='fs-6 text-gray-800 fw-bolder'>123</div>
                      <div className='fw-bold text-gray-500'>Budget</div>
                    </div>
                  </div>

                  <div
                    className='h-4px w-100 bg-light mb-5'
                    data-bs-toggle='tooltip'
                    title='This project completed'
                  >
                    {/* <div
                      className={`bg-${product.statusColor} rounded h-4px`}
                      role='progressbar'
                      style={{ width: `${product.progress}%` }}
                    ></div> */}
                  </div>

                  {/* <UsersList users={users} /> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Content>
    </>
  );
};

export { DashboardPage };
