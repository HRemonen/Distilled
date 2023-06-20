import React from 'react'

import { InputType } from '../../types'

const InputField = ({
  id,
  label,
  error,
  register,
  ...inputProps
}: InputType) => (
  <div>
    <label
      htmlFor={id}
      className='mt-4 block text-lg font-medium text-gray-800'
    >
      {label}
    </label>
    <input
      className={`mt-1 block w-full border p-2 ${
        error ? 'border-red-500' : 'border-gray-300'
      } 
        rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
      id={id}
      {...register}
      {...inputProps}
    />
    {error && <p className='mt-2 text-sm text-red-500'>{error.message}</p>}
  </div>
)

export default InputField
