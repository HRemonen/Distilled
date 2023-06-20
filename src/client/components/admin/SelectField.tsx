import React from 'react'

const SelectField = ({
  id,
  label,
  error,
  register,
  children,
  ...inputProps
}: any) => (
  <div>
    <label
      htmlFor={id}
      className='mt-4 block text-lg font-medium text-gray-800'
    >
      {label}
    </label>
    <select
      id={id}
      {...register}
      {...inputProps}
      className={`mt-1 block w-full border p-2 ${
        error ? 'border-red-500' : 'border-gray-300'
      } 
      rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
    >
      {children}
    </select>
    {error && <p className='mt-2 text-sm text-red-500'>{error.message}</p>}
  </div>
)

export default SelectField
