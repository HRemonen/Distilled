import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDistilleries } from '../../services/distilleryService'

const SearchBar = () => {
  const { distilleryData, isLoading } = useDistilleries()

  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')

  const categories = ['Distilleries']

  if (isLoading || !distilleryData) return null

  const filteredData = distilleryData.data.filter(
    (distillery) =>
      search.length > 2 &&
      distillery.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='pin fixed left-[10vw] top-4 z-20 w-[80%] lg:left-[25vw] lg:w-[50%]'>
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
            className='z-20 block w-full rounded-r-lg border border-l-2 border-gray-600 border-l-gray-700 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
            placeholder={
              category ? `Search ${category}...` : 'Select a category to search'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </div>
      </div>
      {filteredData.length > 0 ? (
        <div className='z-20 mt-2 flex w-full flex-col rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white'>
          {filteredData.map((distillery) => (
            <Link
              to={`./distillery/${distillery.id}`}
              key={`distillery-${distillery.id}`}
              onClick={() => setSearch('')}
            >
              <div
                className='my-2 block w-full pl-2 hover:text-gray-400'
                key={distillery.id}
              >
                {distillery.name}
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default SearchBar
