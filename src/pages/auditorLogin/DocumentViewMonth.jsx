import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import folderImage from "../../assets/svg/Icon (1).svg"

const DocumentViewMonth = () => {
  const location = useLocation();
   const navigate = useNavigate();
  const { item ,customerId,type } = location.state ; 
  console.log(item,"month");


  const handleMonthClick=(days)=>{
    navigate('/document-view-days', { state: {days,customerId,type,item} });
  }

  const backToDocPage=()=>{
    navigate('/documents');
  }
  const backToYear=()=>{
    navigate('/document-view', { state: { type,customerId  } });
  }


  
  return (
    <div className='p-6'>
      <div className='flex mb-2 gap-2'>
          <button onClick={backToDocPage} className="text-sm font-medium hover:underline transition-colors text-gray-400">Documents</button>
          {">"}
          <button onClick={backToYear} className="text-sm font-medium hover:underline transition-colors text-gray-400">{type}</button>
          {">"}
          <button  className="text-sm font-medium cursor-text">{item?.year}</button>
        </div>
        {/* <div className='flex gap-2 '> */}
      {
                  item?.months === 0 ? 
                  <p className="text-lg font-medium text-gray-600 text-center">No Data Found</p>
                   :
                   <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {
                  item?.months?.map((obj)=>(
                    <div  onClick={() => handleMonthClick(obj)} className="border p-4 rounded-lg transition flex flex-col items-center justify-center">
                    <img src={folderImage} alt="Sales" />
                    <p className="font-normal text-base leading-[34.38px] text-center">{obj?.month}</p>
                  </div>
                ))
                    }
                   </div>

              }
    {/* </div> */}
    </div>
  
  )
}

export default DocumentViewMonth