"use client";

import Image from "next/image";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import downloadIcon from "@/assets/svg/download.svg";

const handleClick = (e) => {
  console.log(e);
};

const columns = [
  { field: "plan", headerName: "Invoice", width: 300 },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    valueGetter: (params) =>
      `${params.row.currency || ""} ${params.row.currencySymbol || ""}${
        params.row.amount || ""
      }`,
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    width: 150,
  },
  {
    field: "actions",
    headerName: "",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <button onClick={() => handleClick(params.row)}>
        <Image
          src={downloadIcon}
          alt="download logo"
          width={20}
          height={20}
          priority
        />
      </button>
    ),
  },
];

const rows = [
  {
    id: "1234",
    plan: "Basic Plan",
    date: "Dec 01, 2022",
    currency: "USD",
    currencySymbol: "$",
    amount: "16.00",
    status: "Paid",
  },
  {
    id: "5678",
    plan: "Advance Plan",
    date: "Jan 10, 2024",
    currency: "USD",
    currencySymbol: "$",
    amount: "10.00",
    status: "Pending",
  },
  {
    id: "7890",
    plan: "Platinum Plan",
    date: "Sep 12, 2023",
    currency: "USD",
    currencySymbol: "$",
    amount: "22.00",
    status: "Failed",
  },
];

export default function TransactionPage() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  return (
    <div className="px-6 py-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div>
          <p className="text-lg">Transaction</p>
          <p className="text-[10px]">View your billing details and address</p>
        </div>
      </div>
      <div className="bg-[#ffffff82] h-[1px] my-4" />

      <div className="flex gap-2 justify-end">
        <div className="flex justify-center items-center gap-2 bg-[#ffffff6f] border-[1px] border-white rounded px-2 py-1">
          <div className="relative h-5 w-5">
            <Image
              src={downloadIcon}
              alt="download icon"
              fill
              className="object-contain"
              priority
            />
          </div>
          <button>
            <p className="text-xs">Download all</p>
          </button>
        </div>
      </div>

      <div className="text-white mt-4 max-h-[400px] h-[350px] w-[100%]">
        <DataGrid
          className="w-[100%]"
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          checkboxSelection
          disableColumnMenu
          onRowSelectionModelChange={(newSelection) => {
            setSelected(newSelection);
          }}
        />
      </div>
    </div>
  );
}
