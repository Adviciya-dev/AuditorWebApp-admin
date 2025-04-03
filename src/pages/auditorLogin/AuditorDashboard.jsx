import React from 'react'
import { AuditorProfile } from '../../components/auditors/AuditorProfile'
import { DocumentStatus } from '../../components/auditors/DocumentStatus'
import cloude from "../../assets/cloud.png";
import deleteIcon from "../../assets/delete-bin-3-line.png";
import approve from "../../assets/Vector (5).png";
import { CustomerTable } from '../../components/auditors/CustomerTable';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from '../../components/ui/Button';
import menuButton from "../../assets/Compact Button [1.0].png"
import { useCustomQuery } from '../../service/useQueryFetchData';
import { auditorsApi, fetchAuditor } from '../../api/auditor';
import { fetchCustomer } from '../../api/customer';
import { documentCountByStatus } from '../../api/document';
import { formatToDDMMYYWithTime } from '../../constants/generalFunctions';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
const AuditorDashboard = () => {
  const columnHelper = createColumnHelper();


  

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => (
        <div className="flex items-center space-x-3">
          <img
            src={`https://ui-avatars.com/api/?name=${info.getValue()}`}
            alt={info.getValue()}
            className="w-8 h-8 rounded-full"
          />
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('companyname', {
      header: 'Office/Branch',
    }),
    columnHelper.accessor('----', {
      header: 'Department',
    }),


    columnHelper.accessor('designation', {
      header: 'Role',
      cell: (info) => (
        <span className="px-2 py-1 rounded-lg border border-gray-200 text-sm flex flex items-center w-32">
          <div className='w-2 h-2 bg-[#38C793] rounded-full mr-2'>

          </div>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('updatedat', {
      header: 'Last Login',
      cell: (info) => {
        const rawDate = info.getValue(); // Get the raw date value
        const formattedDate = formatToDDMMYYWithTime(rawDate); // Format the date
        return <span>{formattedDate}</span>; // Render the formatted date
      },
    }),
    columnHelper.accessor('action', {
      header: '',
      cell: (info) => (
        <Button variant='nonbg'>
          <img src={menuButton} alt="" />
        </Button>
      ),
    }),
  ];

  const auditorId = localStorage.getItem("auditor_id")

  const { data, error, isLoading } = useCustomQuery(
    "auditors",
    fetchAuditor,
    null,
    auditorId
  );

  const { data: customerList, error: customerError, isLoading: customerLoading } = useCustomQuery(
    "customer",
    fetchCustomer,
    { organizationID: auditorId }
  );

  const { data: documentStatus, error: documentStatusError, isLoading: documentStatusLoading } = useCustomQuery(
    "documentStatus",
    documentCountByStatus,
    {organisation_id: auditorId }
  );

  const statuses = [
    {
        label: 'Approved',
        subLabel: `${documentStatus?.data?.approved?.count} Approved`,
        color: '#34D399',
        bgColor: 'rgb(223 251 238)',
        icon: approve,
        value: parseFloat(documentStatus?.data?.approved?.percentage),
    },
    {
        label: 'Pending',
        subLabel: `${documentStatus?.data?.pending?.count} Pending`,
        color: '#F97316',
        bgColor: 'rgb(245 237 227)',
        icon: deleteIcon,
        value: parseFloat(documentStatus?.data?.pending?.percentage),
    },
    {
        label: 'Resubmit',
        subLabel: `${documentStatus?.data?.Resubmit?.count} Resubmitted`,
        color: '#818CF8',
        bgColor: '#EEF2FF',
        icon: cloude,
        value: parseFloat(documentStatus?.data?.Resubmit?.percentage),
    },
   
];





  return (
    <div className='p-6 space-y-6'>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="label-medium">Organisation / Company</p>
          <p className="paragraph-small text-[#525866]">Here you can see all about Auditor statistics</p>
        </div>

      </div>
      {
        isLoading ?
        <SkeletonLoader rows={3} width="100%" height="40px"/>
        :
        data && data.length > 0 ? (
          <AuditorProfile
            name={data[0].name}
            company={data[0].companyname}
            department="---"
            role={data[0].designation}
            id={data[0].auditor_id}
            type="auditor"
          />
        ) : (
          <p>No data available</p>
        )
      }
     {
      documentStatusLoading ?
<SkeletonLoader rows={3} width="100%" height="40px"/>
:
<DocumentStatus
statuses={statuses}
/>
     }
     {
      customerLoading ?
      <SkeletonLoader rows={5} width="100%" height="40px"/>
      :
      <CustomerTable
      customers={customerList || []}
      columns={columns}
    />
     }
     
    
    </div>
  )
}

export default AuditorDashboard