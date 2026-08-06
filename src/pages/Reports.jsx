import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../components/DataTable";
import { useCustomQuery } from "../service/useQueryFetchData";
import { fetchDocumentCustomers } from "../api/document";
import { fetchAuditor } from "../api/auditor";

const columnHelper = createColumnHelper();

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const columns = [
  columnHelper.accessor("companyname", { header: "Company" }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("contactperson", { header: "Contact Person" }),
  columnHelper.accessor("contactnumber", { header: "Contact Number" }),
  columnHelper.accessor((row) => row.upload_limit?.monthly_limit, {
    id: "monthly_limit",
    header: "Monthly Limit",
    cell: (info) => info.getValue() ?? "No limit",
  }),
  columnHelper.accessor((row) => row.upload_limit?.used, {
    id: "used",
    header: "Used",
    cell: (info) => info.getValue() ?? 0,
  }),
  columnHelper.accessor((row) => row.upload_limit?.remaining, {
    id: "remaining",
    header: "Remaining",
    cell: (info) => info.getValue() ?? "-",
  }),
  columnHelper.accessor((row) => row.upload_limit?.limit_updated_at, {
    id: "limit_updated_at",
    header: "Limit Updated",
    cell: (info) => formatDate(info.getValue()),
  }),
];

export default function Reports() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [auditorId, setAuditorId] = useState("");

  const { data: auditors } = useCustomQuery("auditors", fetchAuditor, { pageSize: 1000 });

  const { data, error, isLoading } = useCustomQuery("document-customers", fetchDocumentCustomers, {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(auditorId ? { auditor_id: auditorId } : {}),
  });

  const customers = data?.customers ?? [];
  const totalPages = data?.pagination?.totalPages ?? 0;
  const totalCount = data?.pagination?.totalCount ?? 0;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="label-medium">Upload Limits</p>
          <p className="paragraph-small text-[#525866]">
            Customer upload limits and usage for the current period
          </p>
        </div>
        {data?.resetsOn && (
          <p className="paragraph-small text-[#525866]">
            Limits reset on {formatDate(data.resetsOn)}
          </p>
        )}
      </div>

      <div className="p-4 rounded-lg border border-gray-200">
        <div className="flex mb-4">
          <select
            className="px-4 py-2 border rounded-lg w-64 h-[36px]"
            value={auditorId}
            onChange={(e) => {
              setAuditorId(e.target.value);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
          >
            <option value="">All Auditors</option>
            {auditors?.map((auditor) => (
              <option key={auditor.auditor_id} value={auditor.auditor_id}>
                {auditor.contactperson}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: pagination.pageSize }).map((_, index) => (
              <div key={index} className="animate-pulse h-8 bg-gray-100 rounded-md" />
            ))}
          </div>
        ) : error ? (
          <p className="paragraph-small text-red-500">Failed to load customers.</p>
        ) : (
          <>
            <DataTable
              data={customers}
              columns={columns}
              showNavigation
              manualPagination
              pagination={pagination}
              onPaginationChange={setPagination}
              pageCount={totalPages}
            />
            <p className="paragraph-small text-[#525866] mt-2">{totalCount} customers total</p>
          </>
        )}
      </div>
    </div>
  );
}
