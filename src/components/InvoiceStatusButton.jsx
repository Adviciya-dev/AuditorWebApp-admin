import React from 'react'
import { CheckCircle, Clock, CheckCircle2 } from 'lucide-react';

const InvoiceStatusButton = ({disable, status, icon, colorClass, hoverColorClass, title, onClick }) => {
console.log(disable);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
    <p className="text-bold mb-2 text-sm">{title}</p>
    <button 
      disabled={disable}
      onClick={onClick}
      className={`w-full ${colorClass} ${hoverColorClass} text-white py-2 px-4 rounded-md
          transition-colors duration-200 flex items-center justify-center gap-2
          ${disable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {icon}
      <span>{status}</span>
    </button>
  </div>
  )
}

export default InvoiceStatusButton
