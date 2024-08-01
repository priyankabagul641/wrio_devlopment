import {FC} from 'react'

import { ToolbarWrapper } from '../../_metronic/layout/components/toolbar'
import { Content } from '../../_metronic/layout/components/content'

import { Card2 } from '../../_metronic/partials/content/cards/Card2'



const DashboardPage: FC = () => (
  
  <>
    <ToolbarWrapper />
    <Content>
    {/* begin::Row */}
    <div className='row g-6 g-xl-9'>
        <div className='col-md-6 col-xl-4'>
          <Card2
            icon='media/svg/brand-logos/plurk.svg'
            badgeColor='primary'
            status='In Progress'
            statusColor='primary'
            title='Fitnes App'
            description='CRM App application to HR efficiency'
            date='November 10, 2021'
            budget='$284,900.00'
            progress={50}
            
          />
          </div>
        </div>
    
    </Content>
  </>
)



export {DashboardPage}
