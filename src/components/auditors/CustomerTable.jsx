import React from 'react';
import { DataTable } from '../DataTable';


import { Button } from '../ui/Button';



export function CustomerTable({customers,columns}) {

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Customers</h2>
      <DataTable
        data={customers}
        columns={columns}
      />
    </div>
  );
}