import React, { useEffect } from "react";
import { getFileIcon, getFileType, openDocument } from "./Utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useCustomQuery } from "../service/useQueryFetchData";
import { getDocumentDetails } from "../api/document";
import excel from "../assets/svg/Icon (2).svg";
import word from "../assets/svg/Icon (4).svg";
import doc from "../assets/svg/Icon (3).svg";
import { SkeletonLoader } from "./ui/SkeletonLoader";

const DocumentList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { list, customerId, type,days,item } = location.state;
  const auditorId = localStorage.getItem("auditor_id");
console.log(list);

  const {
    data: documentsByDate,
    error: documentsByDateError,
    isLoading: documentsByDateLoading,
    refetch,
  } = useCustomQuery(
    `documentDetails ${type} ${list?.date}`,
    getDocumentDetails,
    {
      organizationID: auditorId,
      customer_id: customerId,
      documentType: type,
    },
    list?.date
  );

  // useEffect(() => {
  //     if (list?.date) {
  //         refetch();
  //     }
  // }, [list?.date, refetch]);

  const handleClick = (doc, fileType) => {
    if (fileType === "image") {
      navigate("/document-preview", {
        state: { imageUrl: doc.filepath, data: doc,list,type,days,item,customerId },
      });
    } else {
      openDocument(fileType);
    }
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
  const backToDays=()=>{
    navigate('/document-view-days', { state: {days,customerId,type,item} });
  }

  return (
    <div className="p-6">
      <div>
        <div className="flex mb-2 gap-2">
          <button onClick={backToDocPage} className="text-sm font-medium hover:underline transition-colors text-gray-400">Documents</button>
          {">"}
          <button onClick={backToYear}  className="text-sm font-medium hover:underline transition-colors text-gray-400">
            {type}
          </button>
          {">"}
          <button onClick={backToMonth} className="text-sm font-medium hover:underline transition-colors text-gray-400">
            {item?.year}
          </button>
          {">"}
          <button onClick={backToDays}  className="text-sm font-medium hover:underline transition-colors text-gray-400">
            {days?.month}
          </button>
          {">"}
          <button  className="text-sm font-medium cursor-text">
            {list?.day}
          </button>

        </div>
      </div>
      <div>
        <h2 className="text-base font-medium mb-4">Documents List</h2>
      </div>
      {documentsByDateLoading ? (
        <SkeletonLoader rows={1} width="100%" height="100px" />
      ) : documentsByDate?.documents?.length === 0 ? (
        <p className="text-lg font-medium text-gray-600 text-center">
          No Data Found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-7 gap-4">
          {documentsByDate?.documents?.map((document) => {
            const fileType = getFileType(document.filepath);

            return (
              <div
                key={document.name}
                onClick={() => handleClick(document, fileType)}
                className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 flex flex-col items-center gap-2 border rounded-lg"
              >
                <div className="w-24 h-24 flex items-center justify-center">
                  {fileType === "image" ? (
                    <img
                      src={document.filepath}
                      alt={document.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : fileType === "word" ? (
                    <img src={word} alt="Word Document" className="w-24 h-24" />
                  ) : fileType === "excel" ? (
                    <img
                      src={excel}
                      alt="Excel Document"
                      className="w-24 h-24"
                    />
                  ) : fileType === "pdf" ? (
                    <img
                      src="/path/to/pdf-icon.png"
                      alt="PDF Document"
                      className="w-24 h-24"
                    />
                  ) : (
                    <img
                      src={doc}
                      alt="Unknown Document"
                      className="w-24 h-24"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentList;
