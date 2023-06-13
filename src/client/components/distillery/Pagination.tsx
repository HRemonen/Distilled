import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Table } from '@tanstack/react-table'

const Pagination = ({ table }: { table: Table<any> }) => (
  <div className='mt-4 flex flex-col items-center'>
    <span className='text-sm text-gray-400'>
      Page{' '}
      <span className='font-semibold text-white'>
        {table.getState().pagination.pageIndex + 1}
      </span>{' '}
      of{' '}
      <span className='font-semibold text-white'>{table.getPageCount()}</span>
    </span>
    <div className='my-2 inline-flex items-center -space-x-px'>
      <button
        type='button'
        className='cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white'
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {'<<'}
      </button>
      <button
        type='button'
        className='cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white'
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </button>
      <button
        type='button'
        className='cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white'
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </button>
      <button
        type='button'
        className='cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white'
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </button>
    </div>
  </div>
)

export default Pagination
