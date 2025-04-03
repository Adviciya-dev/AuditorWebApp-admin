import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InvoiceStatusButton from "../../components/InvoiceStatusButton";
import { CheckCircle, CheckCircle2, CircleCheck } from "lucide-react";
import { useCustomMutation } from "../../service/useCustomMutation ";
import { API_CONFIG, ENDPOINTS } from "../../config";


const DocumentPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutation } = useCustomMutation();
  const { imageUrl, data, list, type, days, item, customerId } = location.state;

  //state
  const [docStatus, setDocStatus] = React.useState(data?.status);

  console.log(data);

  const handleClick = (status) => {
    const baseUrl = API_CONFIG.DOC_URL;
    const method = "put";
    const url = `${ENDPOINTS.DOCUMENT.DOC}/${data.id}`;
    mutation.mutate({
      baseUrl,
      method,
      url,
      values: { status: status },
      next: (response) => {
        setDocStatus(status);
        console.log("updated successfully");
      },
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
  const backToDays = () => {
    navigate("/document-view-days", {
      state: { days, customerId, type, item },
    });
  };
  const backToDocList = () => {
    navigate("/document-view-list", {
      state: { list, customerId, type, days, item },
    });
  };

  return (
    <div className="p-6">
      <div className="flex mb-4 gap-2">
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
        <button onClick={backToDays} className="text-sm font-medium hover:underline transition-colors text-gray-400">
          {days?.month}
        </button>
        {">"}
        <button onClick={backToDocList} className="text-sm font-medium hover:underline transition-colors text-gray-400">
          {list?.day}
        </button>
        {">"}
        <button className="text-sm font-medium cursor-text">{data?.filename}</button>
      </div>

      <div className="flex w-full justify-between">
        <div className="w-[60%] h-[80vh] flex justify-center items-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg shadow-lg"
            />
          ) : (
            <p className="text-gray-500">No image to display</p>
          )}
        </div>

        <div className="w-[35%] flex flex-col gap-2">
          <InvoiceStatusButton
            status="Approved"
            icon={<CheckCircle2 className="w-5 h-5" />}
            colorClass="bg-emerald-500"
            hoverColorClass="hover:bg-emerald-600"
            // colorClass="bg-indigo-500"
            // hoverColorClass="hover:bg-indigo-600"
            title="Invoice Marked as"
            onClick={() => handleClick("Approved")}
            disable={docStatus === "Approved"}
          />

          <InvoiceStatusButton
            status="Canceled"
            icon={<CheckCircle className="w-5 h-5" />}
            colorClass="bg-[#e8392c]"
            hoverColorClass="hover:bg-[#d4281c]"
            title="Invoice Marked as"
            onClick={() => handleClick("Canceled")}
            disable={docStatus === "Canceled"}
          />

          <InvoiceStatusButton
            status="Resubmit"
            icon={<CheckCircle className="w-5 h-5" />}
            colorClass="bg-orange-500"
            hoverColorClass="hover:bg-orange-600"
            title="Invoice Marked as"
            onClick={() => handleClick("Resubmit")}
            disable={docStatus === "Resubmit"}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
