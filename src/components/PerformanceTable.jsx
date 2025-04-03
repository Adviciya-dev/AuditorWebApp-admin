import { useState } from 'react';
import { DataTable } from './DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import  csv from "../assets/csv-02.png"
import xsl from "../assets/xsl-02.png"
import element from "../assets/elements.png"
import plus from "../assets/Plus 4.png"
const columnHelper = createColumnHelper();

export function PerformanceTable() {
  const [dateRange] = useState('1 Jun 2023 - 11 Feb 2024');

  const performanceData = [
    {
      id: 1,
      office: 'Office/Branch Name',
      completed: 15,
      pending: 14,
      month: 'January',
      year: '2024',
    },
    {
      id: 2,
      office: 'Office/Branch Name',
      completed: 15,
      pending: 14,
      month: 'February',
      year: '2024',
    },
    {
      id: 3,
      office: 'Office/Branch Name',
      completed: 15,
      pending: 13,
      month: 'March',
      year: '2024',
    },
  ];

  const columns = [
    columnHelper.accessor('office', {
      header: 'Office/Branch',
    }),
    columnHelper.accessor('completed', {
      header: 'Completed',
    }),
    columnHelper.accessor('pending', {
      header: 'Pending',
    }),
    columnHelper.accessor('month', {
      header: 'Month',
    }),
    columnHelper.accessor('year', {
      header: 'Year',
    }),
    columnHelper.accessor('actions', {
      header: 'Bill',
      cell: () => (
        <div className="flex space-x-2">
          <button className="p-1">
            
          </button>
          <button className="p-1">
            
          </button>
        </div>
      ),
    }),
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Performance Over Time</h2>
        <span className="text-sm text-gray-500 border rounded-lg p-2">{dateRange}</span>
      </div>

      <div className="flex space-x-3 mb-6">
        <button className="flex items-center px-3 py-1.5 text-sm text-label text-[#525866] bg-white border rounded-lg hover:bg-gray-50">
          <img src={plus} alt="" className='mr-2' />
          Add
        </button>
        <button className="flex items-center px-3 py-1.5 text-sm text-label text-[#525866] bg-white border rounded-lg hover:bg-gray-50">
           <img src={csv} alt="" className='mr-2'/>
           Download CSV
        </button>
        <button className="flex items-center px-3 py-1.5 text-sm text-label text-[#525866] bg-white border rounded-lg hover:bg-gray-50">
          <img src={element} alt="" className='mr-2' />
           Manage Integrations
        </button>
        <button className="flex items-center px-3 py-1.5 text-sm text-label text-[#525866] bg-white border rounded-lg hover:bg-gray-50">
          <img src={xsl} alt="" className='mr-2'/>
          Import Excel
        </button>
      </div>

      <DataTable
        data={performanceData}
        columns={columns}
        showNavigation={true}
        showSearch={false}
      />
    </div>
  );
}