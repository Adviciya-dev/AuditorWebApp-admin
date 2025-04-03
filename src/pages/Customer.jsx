import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import search from "../assets/search-2-line.png";
import approve from "../assets/Vector (5).png";
import cloud from "../assets/cloud.png";
import deleteIcon from "../assets/delete-bin-3-line.png";

import { AuditorCard } from '../components/auditors/AuditorCard';
import { AuditorProfile } from '../components/auditors/AuditorProfile';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';

import { useCustomQuery } from '../service/useQueryFetchData';
import { fetchCustomer } from '../api/customer';
import { documentCountByStatus, getDocuments } from '../api/document';
import { DocumentStatus } from '../components/auditors/DocumentStatus';

const Customer = () => {
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: customers, error: customerError, isLoading: customerLoading } = useCustomQuery(
    "customer",
    fetchCustomer
  );

  const handleViewProfile = async (id) => {
    setIsLoading(true);
    try {
      const [data, status, document] = await Promise.all([
        fetchCustomer(null, id),
        documentCountByStatus({ customer_id: id }),
        getDocuments({ customer_id: id }),
      ]);

      setCustomerData(data?.[0] || null);
      setStatusData(status);
      setDocumentData(document);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statuses = statusData ? [
    {
      label: 'Approved',
      subLabel: `${statusData.data?.approved?.count || 0} Approved`,
      color: '#34D399',
      bgColor: 'rgb(223 251 238)',
      icon: approve,
      value: parseFloat(statusData.data?.approved?.percentage || 0),
    },
    {
      label: 'Pending',
      subLabel: `${statusData.data?.pending?.count || 0} Pending`,
      color: '#F97316',
      bgColor: 'rgb(245 237 227)',
      icon: deleteIcon,
      value: parseFloat(statusData.data?.pending?.percentage || 0),
    },
  ] : [];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="label-medium">Customers</p>
          <p className="paragraph-small text-[#525866]">
            Here you can see all about Auditor statistics
          </p>
        </div>
        <button
          onClick={() => navigate('/add-customer')}
          className="px-4 py-2 bg-[#368FFD] text-white rounded-lg hover:bg-blue-600"
        >
          + Add Customer
        </button>
      </div>

      <div className="p-4 rounded-lg border border-gray-200 flex flex-col">
        <div className="flex mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 h-[36px]"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img src={search} alt="search" />
            </span>
          </div>
          <button className="ml-2 px-4 py-2 bg-black text-white rounded-lg h-[36px]">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
  {customerLoading ? (
    <SkeletonLoader rows={1} width="100%" height="80px" />
  ) : (
    customers?.map((customer) => (
      <div
        key={customer.id}
        onMouseEnter={() => setSelectedCard(customer.id)}
        onMouseLeave={() => setSelectedCard(null)}
        className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
          selectedCard === customer.id
            ? 'border-blue-500 shadow-lg'
            : 'border-gray-200'
        }`}
      >
        <AuditorCard
          {...customer}
          isSelected={selectedCard === customer.id}
          onViewProfile={() => handleViewProfile(customer.customer_id)}
        />
      </div>
    ))
  )}
</div>

        {isLoading ? (
          <SkeletonLoader rows={5} width="100%" height="35px" />
        ) : (
          <>
            {customerData && (
              <AuditorProfile
                name={customerData.name}
                company={customerData.companyname}
                department="---"
                role={customerData.designation}
                id={customerData.customer_id}
              />
            )}
            {customerData && (
              <DocumentStatus
                statuses={statuses}
                uploadIcon={true}
                id={customerData.id}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Customer;
