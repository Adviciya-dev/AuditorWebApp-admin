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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const {
    data: auditors,
    error,
    isLoading,
  } = useCustomQuery("auditors", fetchAuditor, {
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });
  const [selectedCard, setSelectedCard] = useState(null);

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
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img src={search} alt="" />
            </span>
          </div>
          <button className="ml-2 px-4 py-2 bg-[#000] button-text text-[#fff] rounded-lg hover:bg-[#000] flex h-[36px]">
            Search
          </button>
        </div>
     
          <div className="flex flex-wrap pb-4 gap-4">
            {auditors?.map((auditor) => (
              <div
                key={auditor.name}
                onClick={() => setSelectedCard(auditor.name)}
                className={`cursor-pointer transition-all duration-300 min-w-[300px] ${
                  selectedCard === auditor.name
                    ? "border-blue-500 scale-105 shadow-lg"
                    : "border-gray-200 scale-100"
                }`}
              >
                <AuditorCard key={auditor.name} {...auditor} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              className="px-3 py-1 text-sm bg-gray-100 rounded-lg disabled:opacity-50"
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.max(0, prev.pageIndex - 1),
                }))
              }
              disabled={pagination.pageIndex === 0}
            >
              {'<'}
            </button>
            <button
              className="px-3 py-1 text-sm bg-gray-100 rounded-lg disabled:opacity-50"
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: prev.pageIndex + 1,
                }))
              }
              disabled={!auditors || auditors.length < pagination.pageSize}
            >
              {'>'}
            </button>
          </div>

      </div>

      {/* Profile Section */}
      <AuditorProfile
        name="Emon Pixels"
        company="Dazhboards Pty. Ltd"
        department="Sales"
        role="Auditing Specialist"
      />

      {/* Document Status */}
      <DocumentStatus statuses={statuses} />

      {/* Customers Table */}
      <CustomerTable customers={customers} columns={columns} />
    </div>
  );
}
