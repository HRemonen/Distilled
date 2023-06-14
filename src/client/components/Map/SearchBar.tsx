import React, { useState } from 'react'

const SearchBar = () => {
  const [category, setCategory] = useState('')

  const categories = ['Distilleries', 'Whiskeys']

  console.log(category)

  return (
    <form className='pin fixed left-[10vw] top-4 z-20 w-[80%] lg:left-[25vw] lg:w-[50%]'>
      <div className='flex'>
        <select
          id='countries'
          className='block rounded-l-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className='relative w-full'>
          <input
            disabled={!category}
            type='search'
            id='search-dropdown'
            className='z-20 block w-full rounded-r-lg border border-l-2 border-gray-600 border-l-gray-700 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
            placeholder={`Search ${categories.join(', ')}...`}
            required
          />
          <button
            type='submit'
            className='absolute right-0 top-0 rounded-r-lg border border-blue-700 bg-blue-600 p-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800'
          >
            <svg
              aria-hidden='true'
              className='h-5 w-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <span className='sr-only'>Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar
