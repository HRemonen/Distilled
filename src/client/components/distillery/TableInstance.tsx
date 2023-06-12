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
    <div className='relative mt-2 flex max-w-full flex-col flex-wrap overflow-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-gray-400'>
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
                  className='whitespace-nowrap px-2 py-4 text-left text-sm font-light'
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
