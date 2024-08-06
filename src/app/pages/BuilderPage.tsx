
import { ToolbarWrapper } from '../../_metronic/layout/components/toolbar';
import { Content } from '../../_metronic/layout/components/content';
import React, { useState } from 'react';
import { getUserCheckInLog } from '../modules/auth/core/_requests';

// Define the expected shape of the log data
interface LogData {
  ProductName: string;
  totalItems: number;
  Total: number;
  Date: string;
  BussinessName: string;
  WrioCode: string;
  TokenId: any;
  TerminalImage: any;
  CheckedIn: any;
  'Check In Time': string; // Add any other properties from your response
}

interface UserAccount {
  UserRole: string;
  UserId: number;
}

type StatusKey = 'N' | 'C' | 'CO' | 'CN' | 'DP' | 'AT' | 'RD' | 'PU' | 'NO';

// Component for displaying the check-in status
const CheckInStatus: React.FC<{ status: StatusKey }> = ({ status }) => {
  const statusMap: Record<StatusKey, { color: string; label: string }> = {
    N: { color: 'orange', label: 'Waiting' },
    C: { color: 'red', label: 'Cancelled' },
    CO: { color: 'green', label: 'Completed' },
    CN: { color: 'purple', label: 'Confirmed' },
    DP: { color: 'darkblue', label: 'Dispatched' },
    AT: { color: 'green', label: 'Attended' },
    RD: { color: 'orange', label: 'Ready for Delivery' },
    PU: { color: 'lightgreen', label: 'Ready for Pickup' },
    NO: { color: 'red', label: 'No Order' },
  };

  const { color, label } = statusMap[status] || { color: 'gray', label: 'Unknown' };

  return <span style={{ fontSize: 'smaller', color }}>{label}</span>;
};

const BuilderPage: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [viewLogList, setViewLogList] = useState<LogData[]>([]);
  const [total, setTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  // Parse user information from sessionStorage
  const userAccount: UserAccount = JSON.parse(sessionStorage.getItem('CurrentUserInfo') || '{}');

  const parseViewLog = async () => {
    const tempEndDate = new Date(endDate);
    const tempStartDate = new Date(startDate);
    const timeDiff = Math.abs(tempEndDate.getTime() - tempStartDate.getTime());
    const dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));

    console.log('dateDifference - ', dateDifference);

    if (startDate && endDate && dateDifference <= 31) {
      console.log('Loading');

      const formattedStartDate = startDate.split('T')[0];
      const formattedEndDate = endDate.split('T')[0];

      console.log('Start Date - ', formattedStartDate);
      console.log('End Date - ', formattedEndDate);

      try {
        const response = await getUserCheckInLog(userAccount.UserId, formattedStartDate, formattedEndDate);

        console.log('User products response:', response);

        let totalAmount = 0;
        if (response.data === 'User Log not found') {
          setViewLogList([]);
          setTotal(0);
          setErrorMessage('Products are not found.'); // Set error message
        }else
        if (Array.isArray(response.data)) {
          setViewLogList(response.data);
          response.data.forEach((element: LogData) => {
            console.log('total', element.Total);
            console.log('Check In Time in Log -', element['Check In Time']);

            if (element.Total > 0) {
              totalAmount += Number(element.Total.toFixed(2));
              totalAmount = Number(totalAmount.toFixed(2));
            }
          });
        } else {
          setViewLogList([]);
          totalAmount = 0;
        }

        setTotal(totalAmount);
        console.log('viewlog', response.data);
        console.log('finaltotal', totalAmount);
      } catch (error) {
        console.error('Error fetching logs', error);
        // You might want to show an alert or toast here
      }
    } else {
      console.log('Difference of dates cannot be more than 30 days.');
    }
  };

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className="row gy-5 gx-xl-10">
          <div className="col-xl-10">
            <div className="card card-xxl-stretch mb-5 mb-xl-10">
              {/* <div className="card-header border-0 pt-5">
                <div className="card-title"> */}
                   {/* <div className='flex-grow-1'> */}
          
                <div className="row d-flex flex-wrap mt-2 p-3">
                <div className='col-sm-12 col-xl-4'>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="form-control form-control-solid "
                      placeholder="Start Date"
                    />
                  </div>
                  <div className="col-sm-12 col-xl-4">
                  <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="form-control form-control-solid  "
                      placeholder="End Date"
                    />
                  </div>
                  <div className="col-sm-12 col-xl-4">
                  <button
                      className="btn btn-md btn-primary  "
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-end"
                      data-kt-menu-flip="top-end"
                      onClick={parseViewLog}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                
                  {/* </div> */}
              
                 
                {/* </div>
              </div> */}
              <div className="card-body py-3">
                <div className="table-responsive">
                {errorMessage ? ( // Conditionally render error message
                    <div className="alert alert-warning">{errorMessage}</div>
                  ) : (
                  <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                    <thead>
                      <tr className="fw-bold text-muted">
                        <th className="min-w-150px">Product</th>
                        <th className="min-w-140px">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewLogList.map((log, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="symbol symbol-45px me-5">
                                <img src={log.TerminalImage} alt="Terminal" />
                              </div>
                              <div className="d-flex justify-content-start flex-column">
                                <a className="text-gray-900 fw-bold text-hover-primary fs-6">
                                  {log.BussinessName}
                                </a>
                                <span className="text-muted fw-semibold text-muted d-block fs-7">
                                  {log.totalItems} quantity
                                </span>
                                <span className="text-muted fw-semibold text-muted d-block fs-7">
                                  {log.WrioCode} - {log.TokenId}
                                </span>
                                <CheckInStatus status={log.CheckedIn} />
                              </div>
                            </div>
                          </td>
                          <td>
                            <a className="text-gray-900 fw-bold text-hover-primary d-block fs-6">
                              Total: {log.Total}
                            </a>
                            <span className="text-muted fw-semibold text-muted d-block fs-7">
                              {log['Check In Time']}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export { BuilderPage };
