/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import {
  getCoreRowModel,
  flexRender,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table'

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
  })

  if (!data) return null

  return (
    <div className='relative flex max-w-full flex-col overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-left text-sm text-gray-400'>
        <thead className='bg-gray-700 text-xs uppercase text-gray-400'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='px-6 py-3'>
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
                  className='whitespace-nowrap px-6 py-4 text-sm font-light'
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableInstance
