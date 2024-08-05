import clsx from 'clsx'
import {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../_metronic/layout/core'
import { ToolbarWrapper } from '../../_metronic/layout/components/toolbar'
import { Content } from '../../_metronic/layout/components/content'
import { ListsWidget3, TablesWidget10 } from '../../_metronic/partials/widgets'
import { Dropdown1 } from '../../_metronic/partials'


const BuilderPage: React.FC = () => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  // const updateConfig = () => {
  //   setConfigLoading(true)
  //   try {
  //     LayoutSetup.setConfig(config)
  //     window.location.reload()
  //   } catch (error) {
  //     setConfig(getLayoutFromLocalStorage())
  //     setConfigLoading(false)
  //   }
  // }

  // const reset = () => {
  //   setResetLoading(true)
  //   setTimeout(() => {
  //     setConfig(getLayoutFromLocalStorage())
  //     setResetLoading(false)
  //   }, 1000)
  // }

  return (
    <>
      <ToolbarWrapper />
      <Content>
      <div className='row gy-5 gx-xl-8'>
    
      <div className='col-xl-8'>
        {/* <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' /> */}
        <div className='card card-xxl-stretch mb-5 mb-xl-8'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
      <div className='card-title'>
      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative my-1'>
        <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-6' />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-250px ps-14'
          placeholder='Search user'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* end::Search */}
    </div>
    <div className='card-toolbar'>
                  <div className='me-n3'>
                    <button
                      className='btn btn-sm btn-icon btn-active-light-primary'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                      data-kt-menu-flip='top-end'
                    >
                      <i className='bi bi-three-dots fs-2'></i>
                    </button>
                    <Dropdown1 />
                  </div>
                </div>

        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
         
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>
              
                <th className='min-w-150px'>Product</th>
                <th className='min-w-140px'>Date</th>
              
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
              
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src={toAbsoluteUrl('media/avatars/300-14.jpg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                        Ana Simmons
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      1 quantity
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block fs-6'>
                    Total : 166.50
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                31 july 2024
                  </span>
                </td>
              
              </tr>
              <tr>
                
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src={toAbsoluteUrl('media/avatars/300-2.jpg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                        Jessie Clarcson
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        C#, ASP.NET, MS SQL
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block fs-6'>
                    Agoda
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    Houses &amp; Hotels
                  </span>
                </td>
              
              </tr>
              <tr>
                
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src={toAbsoluteUrl('media/avatars/300-5.jpg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                        Lebron Wayde
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        PHP, Laravel, VueJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block fs-6'>
                    RoadGee
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    Transportation
                  </span>
                </td>
             
              </tr>
              <tr>
                
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src={toAbsoluteUrl('media/avatars/300-20.jpg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                        Natali Goodwin
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        Python, PostgreSQL, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block fs-6'>
                    The Hill
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Insurance</span>
                </td>
               
              </tr>
              <tr>
               
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src={toAbsoluteUrl('media/avatars/300-23.jpg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                        Kevin Leonard
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block fs-6'>
                    RoadGee
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    Art Director
                  </span>
                </td>
                
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
      </div>
    </div>
       
      </Content>
    </>
  )
}

export {BuilderPage}
