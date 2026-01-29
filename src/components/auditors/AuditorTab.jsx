import React, { useState } from "react";

import { AuditorCard } from "./AuditorCard";
import { AuditorProfile } from "./AuditorProfile";
import { DocumentStatus } from "./DocumentStatus";
import { CustomerTable } from "./CustomerTable";
import { useNavigate } from "react-router-dom";
import search from "../../assets/search-2-line.png";
import cloude from "../../assets/cloud.png";
import deleteIcon from "../../assets/delete-bin-3-line.png";
import approve from "../../assets/Vector (5).png";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "../ui/Button";
import menuButton from "../../assets/Compact Button [1.0].png";
import { useCustomQuery } from "../../service/useQueryFetchData";
import { fetchAuditor } from "../../api/auditor";

export function AuditorTab() {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const {
    data: auditors,
    error,
    isLoading,
  } = useCustomQuery("auditors", fetchAuditor, { page: currentPage, pageSize });
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeAuditorId, setActiveAuditorId] = useState(null);
  const [auditorData, setAuditorData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewProfile = (auditor) => {
    console.log("Selected auditor:", auditor);
    setActiveAuditorId(auditor.id);
    setAuditorData(auditor);
  };

  const statuses = [
    {
      label: "Verified",
      subLabel: "25 Verified",
      color: "#818CF8",
      bgColor: "#EEF2FF",
      icon: cloude,
      value: 25,
    },
    {
      label: "Approved",
      subLabel: "50 Approved",
      color: "#34D399",
      bgColor: "#ECFDF5",
      icon: approve,
      value: 56,
    },
    {
      label: "Pending",
      subLabel: "40 Pending",
      color: "#F97316",
      bgColor: "#FFF7ED",
      icon: deleteIcon,
      value: 40,
    },
  ];
  const customers = [
    {
      id: 1,
      name: "Jane Doe",
      company: "EarthWorks Pty Ltd",
      status: "Present",
      role: "Senior Manager",
      lastUpdated: "Aug 15, 2023",
    },
    // Add more customer data as needed
  ];

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <div className="flex items-center space-x-3">
          <img
            src={`https://ui-avatars.com/api/?name=${info.getValue()}`}
            alt={info.getValue()}
            className="w-8 h-8 rounded-full"
          />
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("Office/Branch", {
      header: "Office/Branch",
    }),
    columnHelper.accessor("department", {
      header: "Department",
    }),

    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => (
        <span className="px-2 py-1 rounded-lg border border-gray-200 text-sm flex flex items-center w-32">
          <div className="w-2 h-2 bg-[#38C793] rounded-full mr-2"></div>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("lastUpdated", {
      header: "Last Login",
    }),
    columnHelper.accessor("action", {
      header: "",
      cell: (info) => (
        <Button variant="nonbg">
          <img src={menuButton} alt="" />
        </Button>
      ),
    }),
  ];

  const filteredAuditors = auditors?.filter((auditor) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      auditor.name?.toLowerCase().includes(query) ||
      auditor.contactperson?.toLowerCase().includes(query) ||
      auditor.companyname?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 p-6 ">
      {/* Auditor Cards */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="label-medium">Auditors</p>
          <p className="paragraph-small text-[#525866]">
            Here you can see all about Auditor statistics
          </p>
        </div>
        <button
          onClick={() => navigate("/add-auditor")}
          className="px-4 py-2 bg-[#368FFD] button-text text-[#fff] rounded-lg hover:bg-blue-600 flex"
        >
          + Add Auditor
        </button>
      </div>
      <div className="p-4 rounded-lg border border-gray-200 flex flex-col">
        <div className="flex mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 h-[36px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img src={search} alt="" />
            </span>
          </div>
        </div>

          <div className="flex overflow-x-auto whitespace-nowrap pb-4 gap-4">
            {filteredAuditors?.map((auditor) => (
              <div
                key={auditor.id}
                onClick={() => {
                  setSelectedCard(auditor.id);
                  handleViewProfile(auditor);
                }}
                className={`cursor-pointer transition-all duration-300 min-w-[300px] ${
                  activeAuditorId === auditor.id
                    ? "border-blue-500 scale-105 shadow-lg"
                    : "border-gray-200 scale-100"
                }`}
              >
                <AuditorCard
                  {...auditor}
                  imageUrl={auditor.image}
                  isSelected={activeAuditorId === auditor.id}
                  onViewProfile={() => handleViewProfile(auditor)}
                  btnLabel="View Profile"
                />
              </div>
            ))}
          </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-[#525866]">Page {currentPage}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={!auditors || auditors.length < pageSize}
              className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="mt-4">
          {auditorData && (
            <AuditorProfile
              name={auditorData.contactperson || auditorData.name}
              company={auditorData.companyname || auditorData.office}
              department={auditorData.department || "---"}
              role={auditorData.role || "---"}
              imageUrl={auditorData.image}
              id={auditorData.id}
              type="auditor"
            />
          )}
        </div>
      </div>

      {/* Document Status */}
      <DocumentStatus statuses={statuses} />

      {/* Customers Table */}
      <CustomerTable customers={customers} columns={columns} />
    </div>
  );
}
