
'use client';
// FilterableTable.tsx
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Product } from "./type";

// Dữ liệu sản phẩm mẫu
const defaultData: Product[] = [
  { id: 1, name: "iPhone 14", price: 1000 },
  { id: 2, name: "MacBook Pro", price: 2000 },
  { id: 3, name: "AirPods", price: 200 },
  { id: 4, name: "iPad Pro", price: 1200 },
];

// Khởi tạo column helper
const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Product Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price ($)",
    cell: (info) => `$${info.getValue()}`,
  }),
];

export default function FilterableTable() {
  const [data] = useState<Product[]>(defaultData);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)).toLowerCase().includes(filterValue.toLowerCase()),
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Bảng sản phẩm có filter + sort</h2>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm theo tên sản phẩm..."
        className="border p-2 mb-3 w-full"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      {/* Bảng dữ liệu */}
      <table className="border border-gray-300 w-full">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border p-2 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Không có kết quả */}
      {table.getRowModel().rows.length === 0 && (
        <div className="mt-2 text-gray-500">Không tìm thấy sản phẩm nào</div>
      )}
    </div>
  );
}
