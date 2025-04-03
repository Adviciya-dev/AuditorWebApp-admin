import React from 'react'
import { NavLink } from 'react-router-dom';
import folderImage from "../assets/svg/Icon (1).svg"


const SalesPage = () => (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Sales Page</h1>
    </div>
  );
  
  const ExpensePage = () => (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Expense Page</h1>
    </div>
  );
  
  const PurchasePage = () => (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Purchase Page</h1>
    </div>
  );

export const Documents = () => {
  return (
    <div className="p-6">
    <div className="flex gap-2">
    <div className="border p-4 rounded-lg transition flex flex-col items-center justify-center w-[22%]">
      <NavLink to="/sales">
       
       <img src={folderImage} />
        <p className="font-normal text-base leading-[34.38px] text-center">Sales</p>
      </NavLink>
    </div>
    <div className="border p-4 rounded-lg transition flex flex-col items-center justify-center w-[22%]">
      <NavLink to="/expense">
      <img src={folderImage} />
        <p className="font-normal text-base leading-[34.38px] text-center">Expense</p>
      </NavLink>
    </div>
    <div className="border p-4 rounded-lg transition flex flex-col items-center justify-center w-[22%]">
      <NavLink to="/purchase">
      <img src={folderImage} />
        <p className="font-normal text-base leading-[34.38px] text-center">Purchase</p>
      </NavLink>
    </div>
    <div className="border p-4 rounded-lg transition flex flex-col items-center justify-center w-[32%]">

    </div>
  </div>
  </div>
)


  
}
