import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import folderImage from "../../assets/svg/Icon (1).svg";

const DocumentViewDays = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { days, customerId, type, item } = location.state;

  const handleDayClick = (list) => {
    navigate("/document-view-list", {
      state: { list, customerId, type, days, item },
    });
  };

  const backToDocPage = () => {
    navigate("/documents");
  };
  const backToYear = () => {
    navigate("/document-view", { state: { type, customerId } });
  };
  const backToMonth = () => {
    navigate("/document-view-month", { state: { item, customerId, type } });
  };
  return (
    <div className="p-6">
      <div className="flex mb-2 gap-2">
        <button onClick={backToDocPage} className="text-sm font-medium hover:underline transition-colors text-gray-400">
          Documents
        </button>
        {">"}
        <button onClick={backToYear} className="text-sm font-medium hover:underline transition-colors text-gray-400">
          {type}
        </button>
        {">"}
        <button onClick={backToMonth} className="text-sm font-medium hover:underline transition-colors text-gray-400">
          {item?.year}
        </button>
        {">"}
        <button className="text-sm font-medium cursor-text">{days?.month}</button>
      </div>
      <div className="flex gap-2">
        {days?.days?.length === 0 ? (
          <p className="text-lg font-medium text-gray-600 text-center">
            No Data Found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {days?.days?.map((obj) => (
              <div
                onClick={() => handleDayClick(obj)}
                className="border p-4 rounded-lg transition flex flex-col items-center justify-center"
              >
                <img src={folderImage} alt="Sales" />
                <p className="font-normal text-base leading-[34.38px] text-center">
                  {obj?.day}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewDays;
