import React, { useState } from 'react'
import { AuditorCard } from '../../components/auditors/AuditorCard';
import search from "../../assets/search-2-line.png"
import { NavLink, useNavigate } from 'react-router-dom';
import folderImage from "../../assets/svg/Icon (1).svg"
import { DocumentStatus } from '../../components/auditors/DocumentStatus';
import approve from "../../assets/Vector (5).png";
import cloude from "../../assets/cloud.png";
import deleteIcon from "../../assets/delete-bin-3-line.png";
import { CircularProgress } from '../../components/CircularProgress';
import DocumentList from '../../components/DocumentList';
import { fetchCustomer } from '../../api/customer';
import { useCustomQuery } from '../../service/useQueryFetchData';
import { documentCountByStatus } from '../../api/document';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
import { useAuditor } from '../../contexts/AuditorContext';

const AuditorDocuments = () => {
  const navigate = useNavigate();
  const { data: customers, error: customerError, isLoading: customerLoading } = useCustomQuery(
     "customer",
     fetchCustomer,
    
   );
   const { selectedCard, setSelectedCard, customerId, setCustomerId,statusData,setStatusData } = useAuditor();

  // const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

// const [customerId,setCustomerId]=useState()
    const handleViewProfile = async (id) => {
      setCustomerId(id)
      setIsLoading(true);
      try {
        
          const status = await documentCountByStatus({customer_id: id });
         
          setStatusData(status)
          
      } catch (error) {
          console.error("Error fetching customer data:", error);
      } finally {
        setIsLoading(false); 
    }
  };

  console.log(statusData);
  

const statuses = [
  {
      label: 'Approved',
      subLabel: `${statusData?.data?.approved?.count} Approved`,
      color: '#34D399',
      bgColor: 'rgb(223 251 238)',
      icon: approve,
      value: parseFloat(statusData?.data?.approved?.percentage),
  },
  {
      label: 'Pending',
      subLabel: `${statusData?.data?.pending?.count} Pending`,
      color: '#F97316',
      bgColor: 'rgb(245 237 227)',
      icon: deleteIcon,
      value: parseFloat(statusData?.data?.pending?.percentage),
  },
  {
      label: 'Resubmit',
      subLabel: `${statusData?.data?.Resubmit?.count} Resubmitted`,
      color: '#818CF8',
      bgColor: '#EEF2FF',
      icon: cloude,
      value: parseFloat(statusData?.data?.Resubmit?.percentage),
  },
 
];


const handleNavigation = (type) => {
  navigate('/document-view', { state: { type,customerId  } });
};


  return (
    <div className="space-y-6 p-6">
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <div className="text-center md:text-left">
        <p className="label-medium">Document</p>
        <p className="paragraph-small text-gray-600">Here you can see all about Auditor statistics</p>
      </div>
      <button 
        onClick={() => navigate('/add-customer')} 
        className="mt-4 md:mt-0 px-4 py-2 bg-blue-500 button-text text-white rounded-lg hover:bg-blue-600 flex">
        + Add Customer
      </button>
    </div>
    
    <div className='p-4 rounded-lg border border-gray-200 flex flex-col'>
      <div className='flex flex-col md:flex-row items-center mb-4 gap-2'>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 h-[36px]"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <img src={search} alt="" />
          </span>
        </div>
        <button className="px-4 py-2 bg-black button-text text-white rounded-lg hover:bg-gray-800 flex h-[36px]">Search</button>
      </div>
      {
        customerLoading ?
        <SkeletonLoader rows={1} width="100%" height="100px"/>
        :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {customers?.map((customer) => (
           <div
             key={customer.id}
             onClick={() => setSelectedCard(customer.id)}
             className={`cursor-pointer transform transition-all duration-300 ${
               selectedCard === customer.id
                 ? 'border-blue-500 scale-105 shadow-lg'
                 : 'border-gray-200 scale-100'
             }`}
           >
             <AuditorCard
               {...customer}
               isSelected={selectedCard === customer.id}
               onViewProfile={() => handleViewProfile(customer.customer_id)}
               btnLabel="View Document"
             />
           </div>
         ))}
        </div>
      }
    </div>
    
    <div>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-[70%] h-[36px]"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <img src={search} alt="" />
        </span>
      </div>
    </div>
    
    {
       isLoading ? (
      
          <SkeletonLoader rows={5} width="100%" height="30px" />
      
      ) : (
        customerId  &&
      <div className="flex flex-wrap gap-4">
        {['Sales', 'Expense', 'Purchase'].map((category) => (
          <div 
            key={category} 
            className="border p-4 rounded-lg transition flex flex-col items-center justify-center w-full sm:w-[30%] lg:w-[20%]"
            onClick={() => handleNavigation(category)}
          >
            <img src={folderImage} alt={category} />
            <p className="font-normal text-base leading-[34.38px] text-center">{category}</p>
          </div>
        ))}
        <div className="border p-4 rounded-lg transition flex flex-col w-full lg:w-[32%]">
          {statuses.map((status) => (
            <div key={status.label} className="flex items-center space-x-4 p-2 rounded-lg">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: status.bgColor }}
              >
                <img src={status.icon} alt={status.label} className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-inter font-semibold text-[16px] leading-[19.36px]">{status.label}</h3>
                    <p className="font-inter font-medium text-[12px] leading-[16px] text-gray-500">{status.subLabel}</p>
                  </div>
                  <CircularProgress value={status.value} color={status.color} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> 
    
      )
   }
  </div>
  )
}

export default AuditorDocuments