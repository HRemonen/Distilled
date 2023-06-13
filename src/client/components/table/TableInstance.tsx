/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import {
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table'

import Pagination from './Pagination'

interface ReactTableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T>[]
}

const TableInstance = <T extends object>({
  data,
  columns,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (!data) return null

  return (
    <div className='relative ml-2 mt-4 flex max-w-full flex-col flex-wrap overflow-auto rounded-lg shadow-md'>
      <table className='table-auto text-sm text-gray-400'>
        <thead className='bg-gray-700 text-center text-xs uppercase text-gray-400'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='px-2 py-3'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='border-b border-gray-700 bg-gray-800'>
              {row.getVisibleCells().map((cell) => (
                <td
                  className='whitespace-normal break-words px-2 py-4 text-left text-sm font-light'
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </div>
  )
}

export default TableInstance
