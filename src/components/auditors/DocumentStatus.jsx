import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { CloudUpload } from "lucide-react";
import { CircularProgress } from "../CircularProgress";
import { useCustomMutation } from "../../service/useCustomMutation ";
import { API_CONFIG, ENDPOINTS } from "../../config";
import FileUploadPopup from '../FileUploadPopup';

export function DocumentStatus({ statuses, uploadIcon,id }) {
 const [isPopupOpen, setPopupOpen] = useState(false);
  const [uploadingFile, setUploadingFile] = useState([]);
const { mutation } = useCustomMutation();
const organizationId=localStorage.getItem("auditor_id")

  const handleNextFunctiion=()=>{
    console.log("next");
    const valuesToApi = {
      userID: id,
      organizationID: organizationId,
      fileName: uploadingFile[0]?.name,
      filePath: uploadingFile[0]?.apiData?.url,
      documentType: "Reports",
      createdAt:new Date().toISOString(),
      customer_id:id,
      organization_user_id: organizationId,
      files:uploadingFile?.map((obj)=>{
        return{
          fileName:obj?.name,
          filePath:obj?.apiData?.url
        }
      })
    };
    const baseUrl = API_CONFIG.DOC_URL;
    const method = "post";
    const url = `${ENDPOINTS.DOCUMENT.DOC}/upload`;
    mutation.mutate({
      baseUrl,
      method,
      url,
      values: valuesToApi,
      key: "upload",
      next: () => {
        setPopupOpen(false)
    },
    });
  }
  return (
     <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between">
            <h2 className="text-base font-medium mb-4">Documents</h2>
            {uploadIcon && (
             
                <Button
                onClick={() => setPopupOpen(true)}
                        variant="outline"
                        className="text-sm px-4 bg-[#DBEEED] text-[#2F9089] mb-2"
                      >
                        <CloudUpload className="mr-2" />
                        Report Upload
                      </Button>
            )}
          </div>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {statuses.map((status) => (
              <div
                key={status.label}
                className="flex items-center space-x-4 p-6 rounded-lg border border-gray-200"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: status.bgColor }}
                >
                  <img src={status.icon} alt={status.label} className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-inter font-semibold text-[16px] leading-[19.36px]">
                        {status.label}
                      </h3>
                      <p className="font-inter font-medium text-[12px] leading-[16px] text-[#808191]">
                        {status.subLabel}
                      </p>
                    </div>
                    <CircularProgress value={status.value} color={status.color} />
                  </div>
                </div>
              </div>
            ))}
          </div>

              <FileUploadPopup
                  isOpen={isPopupOpen}
                  setIsOpen={setPopupOpen}
                  uploadingFile={uploadingFile}
                  setUploadingFile={setUploadingFile}
                  onNext={handleNextFunctiion}
                />
    
        
        </div>
  )
}

