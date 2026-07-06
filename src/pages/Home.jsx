import { useState } from 'react';
import viewInsight from "../assets/arcs chart.png"
import upload from "../assets/Group 1171277561.png"
import search from "../assets/search-2-line.png"
import undo from "../assets/undo.svg"
import { FaEdit, FaTrash } from 'react-icons/fa';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../components/DataTable';
import editIcon from "../assets/edit-02.png"
import deleteIcon from "../assets/delete-02.png"
import ActiveStatus from "../assets/Vector (1).png"
import { PerformanceTable } from '../components/PerformanceTable';
import { CustomerSatisfaction } from '../components/CustomerSatisfaction';
import { useNavigate, useParams } from 'react-router-dom';
import { AuditorTab } from '../components/auditors/AuditorTab';
import SemiCircleProgress from "../components/SemiCircleProgress";
import Select from "react-select";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme file
import { CustomSelect } from '../components/forms/CustomSelect';
import calender from "../assets/svg/Calendar.svg"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { url } from '../constants/apiUrls';
import { format } from 'date-fns';
import { useCustomQuery } from '../service/useQueryFetchData';
import { auditorsApi, fetchAuditor } from '../api/auditor';
import { useAuditors } from '../hooks/auditors/useAuditors';




function Home() {
  const navigate = useNavigate();
  const { deleteAuditor } = useAuditors();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all-branches');
  const tabs = [
    { id: 'all-branches', label: 'All Branches' },
    // { id: 'auditor', label: 'Auditor' },
    // { id: 'sub-auditor', label: 'Sub Auditor' },
    // { id: 'dummy-text', label: 'Dummy Text' },
  ];

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const options = [
    { value: "7-days", label: "Last 7 days" },
    { value: "30-days", label: "Last 30 days" },
    { value: "custom", label: "Custom" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      border: "1px solid #d1d5db",
      padding: "0.25rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),
  };

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
    setShowDatePicker(false); // Close picker on date selection
  };

  const formatDateRange = () => {
    const start = dateRange[0].startDate.toLocaleDateString();
    const end = dateRange[0].endDate.toLocaleDateString();
    return `${start} - ${end}`;
  };

 



   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

   const { data, error, isLoading } = useCustomQuery(
       "auditors",
       fetchAuditor,
       { page: pagination.pageIndex + 1, pageSize: pagination.pageSize, search: searchQuery }
     );

  const auditors = data ?? [];
  const pageCount = -1; // total page count unknown; server returns one page per request

  console.log(data);
  


  


  

  console.log(data);
  

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;



  const renderContent = () => {
    switch (activeTab) {
      case 'auditor':
        return <AuditorTab />;
      default:
        return (
          <>
             <div className="relative flex items-center justify-between space-x-2 py-2 rounded-lg">
              {/* Search Input */}
              {/* <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div> */}
               <div className="relative w-[60%]">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border rounded-lg w-full h-[36px] focus:outline-none"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <img src={search} alt="" />
                    </span>
                  </div>

              {/* React Select Dropdown */}
              <div className="w-40">
        <CustomSelect
          options={[
            { label: "Last 7 days", value: "7-days" },
            { label: "Last 30 days", value: "30-days" },
            { label: "Custom", value: "custom" },
          ]}
         
          className="h-[36px]"
          height="36px"
        />
      </div>

              {/* Date Range Input */}
              <div className="relative">
                <div
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center space-x-1 text-sm text-gray-600 cursor-pointer border border-gray-300 p-2 rounded-lg hover:ring hover:ring-blue-200"
                >
                  <img src={calender} alt="" />
                  <span>{formatDateRange()}</span>
                </div>

                {showDatePicker && (
                  <div className="absolute z-50 bg-white p-2 rounded-lg shadow-md r-20">
                    <DateRangePicker
                      onChange={handleDateChange}
                      showSelectionPreview={true}
                      moveRangeOnFirstSelection={false}
                      months={1}
                      ranges={dateRange}
                      direction="horizontal"
                    />
                  </div>
                )}
              </div>

              {/* Reset Button */}
              <button
                className="p-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
                onClick={() => {
                  setDateRange([
                    {
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    },
                  ]);
                }}
              >
                Reset
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <SemiCircleProgress value={80} color="#3B82F6" title="Completed" />
              <SemiCircleProgress value={80} color="#F97316" title="Pending" />
              <SemiCircleProgress value={80} color="#22C55E" title="Correction" />
            </div>
            {/* date input  */}

         

            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="label-medium">Auditors</p>
                  <p className="paragraph-small text-[#525866]">Here you can see all about Auditor statistics</p>
                </div>
                <button onClick={() => navigate('/add-auditor')} className="px-4 py-2 bg-[#368FFD] button-text text-[#fff] rounded-lg hover:bg-blue-600 flex">
                  + Add Auditor
                </button>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className='flex'>


                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search company name"
                      className="pl-10 pr-4 py-2 border rounded-lg w-64 h-[36px]"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                      }}
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <img src={search} alt="" />
                    </span>
                  </div>

                </div>

                <div className="flex items-center space-x-2">
                  <select className="border rounded-lg px-3 py-2">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <select className="border rounded-lg px-3 py-2">
                    <option>All Users</option>
                    <option>Auditors</option>
                    <option>Staff</option>
                  </select>
                </div>
              </div>

              <hr className='my-4' />

              <DataTable
                data={auditors}
                columns={columns}
                showNavigation={true}
                simpleNavigation={true}
                manualPagination={true}
                pageCount={pageCount}
                pagination={pagination}
                onPaginationChange={setPagination}
              />
            </div>
            <PerformanceTable />
            <CustomerSatisfaction />
          </>
        );
    }
  };


const handleEdit=(id)=>{
  navigate(`/add-auditor/${id}`)
}

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this auditor?")) {
    deleteAuditor(id);
  }
}

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => {
      const name = info.getValue() || 'Unknown';
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
      return (
        <div className="flex items-center space-x-3">
          <img
            src={avatarUrl}
            alt={name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-500">{info.row.original.email}</div>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor('companyname', {
    header: 'Company Name',
  }),
  columnHelper.accessor('designation', {
    header: 'Role',
  }),
  columnHelper.accessor('lastLogin', {
    header: 'Last Login',
  }),
  columnHelper.accessor('isactive', {
    header: 'Status',
    cell: (info) => {
      const isActive = info.getValue();
      const statusIcon = isActive ? ActiveStatus : ""; // Add InactiveStatus icon if applicable.
      return (
        <span className="px-2 py-1 flex border rounded-lg items-center">
          <img src={statusIcon} alt={isActive ? 'Active' : 'Inactive'} className="mr-2 w-4 h-4" />
          {isActive ? 'Active' : 'Inactive'}
        </span>
      );
    },
  }),
  columnHelper.accessor('createdat', {
    header: 'Date Created',
    cell: (info) => format(new Date(info?.getValue()), 'MM/dd/yyyy'),
  }),
  columnHelper.accessor('updatedat', {
    header: 'Last Modified',
    cell: (info) => format(new Date(info?.getValue()), 'MM/dd/yyyy'),
  }),
  columnHelper.accessor('id', {
    header: 'Action',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(row.original.auditor_id)}
          className="bg-[#27A3761A] rounded-lg h-8 w-8 flex justify-center items-center"
        >
          <img src={editIcon} alt="Edit" className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleDelete(row.original.auditor_id)}
          className="bg-[#DF1C411A] rounded-lg h-8 w-8 flex justify-center items-center"
        >
          <img src={deleteIcon} alt="Delete" className="h-4 w-4" />
        </button>
      </div>
    ),
  }),
];


  return (
    <div className="p-6 bg-[#fff]">

      <div className="flex justify-between items-center mb-4">
        <div className='bg-[#F6F8FA] rounded-full p-[4px]'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-[10px] py-[4px] rounded-full label-small ${activeTab === tab.id
                ? 'bg-[#fff] text-[#000]'
                : ''
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-[#C7EFE0] button-text text-[#000] rounded-lg flex">
            <img src={upload} alt="" className='w-5 h-5 mr-2' />
            Upload
          </button>
          <button className="px-4 py-2 bg-[#368FFD] button-text text-[#fff] rounded-lg hover:bg-blue-600 flex">
            <img src={viewInsight} className='w-5 h-5 mr-2' />
            View Insight
          </button>
        </div>
      </div>
      {renderContent()}


  


    </div>
  );
}

export default Home;