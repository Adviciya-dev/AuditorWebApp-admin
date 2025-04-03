import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCustomQuery } from "../../service/useQueryFetchData";
import { getFolder } from "../../api/document";
import folderImage from "../../assets/svg/Icon (1).svg";
import { SkeletonLoader } from "../../components/ui/SkeletonLoader";

const DocumentView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, customerId } = location.state || { type: "default" };
  const {
    data: folders,
    error: folderError,
    isLoading: folderLoading,
  } = useCustomQuery("folders", getFolder, {
    customer_id: customerId,
    documenttype: type,
  });

  console.log(folders);

  const handleFolderClick = (item) => {
    navigate("/document-view-month", { state: { item, customerId, type } });
  };

  const backToDocPage = () => {
    navigate("/documents");
  };

  console.log(folders?.folders, "folders");

  return (
    <div className="p-6">
      <div className="flex mb-2 gap-2">
        <button onClick={backToDocPage} className="text-sm font-medium hover:underline transition-colors text-gray-400">
          Documents
        </button>
        {">"}
        <button className="text-sm font-medium cursor-text">{type}</button>
      </div>

      <div className="flex gap-2 ">
        {folderLoading ? (
          <SkeletonLoader rows={5} width="100%" height="40px" />
        ) : folders?.folders?.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-lg font-medium text-gray-600">No Data Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {folders?.folders?.map((obj) => (
              <div
                onClick={() => handleFolderClick(obj)}
                className="border p-4 rounded-lg transition flex flex-col items-center justify-center"
              >
                <img src={folderImage} alt="Sales" />
                <p className="font-normal text-base leading-[34.38px] text-center">
                  {obj?.year}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentView;
