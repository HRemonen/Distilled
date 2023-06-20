/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  NewDistillery,
  NewDistilleryZod,
} from '../../validators/distillery_validator'

const NewDistilleryForm = () => {
  const currentYear = new Date().getFullYear()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewDistillery>({
    resolver: zodResolver(NewDistilleryZod),
  })

  const onSubmit = (data: NewDistillery) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
      <label htmlFor='name' className='block text-lg font-medium text-gray-800'>
        Name:
      </label>
      <input
        {...register('name')}
        type='text'
        id='name'
        className={`mt-1 block w-full border p-2 ${
          errors.name ? 'border-red-500' : 'border-gray-300'
        } 
        rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
      />
      {errors.name && (
        <p className='mt-2 text-sm text-red-500'>{errors.name.message}</p>
      )}

      <div className='flex'>
        <div className='w-1/2'>
          <label
            htmlFor='locationLatitude'
            className='mt-4 block text-lg font-medium text-gray-800'
          >
            Location Latitude:
          </label>
          <input
            {...register('location.0', { valueAsNumber: true })}
            type='number'
            step='any'
            id='locationLatitude'
            className={`mt-1 block w-full border p-2 ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            } 
        rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.location?.[0] && (
            <p className='mt-2 text-sm text-red-500'>
              {errors.location[0].message}
            </p>
          )}
        </div>

        <div className='w-1/2 pl-4'>
          <label
            htmlFor='locationLongitude'
            className='mt-4 block text-lg font-medium text-gray-800'
          >
            Location Longitude:
          </label>
          <input
            {...register('location.1', { valueAsNumber: true })}
            type='number'
            step='any'
            id='locationLongitude'
            className={`mt-1 block w-full border p-2 ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            } 
        rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.location?.[1] && (
            <p className='mt-2 text-sm text-red-500'>
              {errors.location[1].message}
            </p>
          )}
        </div>
      </div>

      <label
        htmlFor='country'
        className='mt-4 block text-lg font-medium text-gray-800'
      >
        Country:
      </label>
      <input
        {...register('country')}
        type='text'
        id='country'
        className={`mt-1 block w-full border p-2 ${
          errors.country ? 'border-red-500' : 'border-gray-300'
        } 
        rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
      />
      {errors.country && (
        <p className='mt-2 text-sm text-red-500'>{errors.country.message}</p>
      )}

      <label
        htmlFor='yearEstablished'
        className='mt-4 block text-lg font-medium text-gray-800'
      >
        Year Established:
      </label>
      <select
        {...register('year_established', { valueAsNumber: true })}
        id='yearEstablished'
        className={`mt-1 block w-full border p-2 ${
          errors.year_established ? 'border-red-500' : 'border-gray-300'
        } 
          rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
      >
        <option value=''>-- Select Year --</option>
        {Array.from(
          { length: currentYear - 1800 + 1 },
          (_, index) => currentYear - index
        ).map((year) => (
          <option key={year} value={Number(year)}>
            {year}
          </option>
        ))}
      </select>
      {errors.year_established && (
        <p className='mt-2 text-sm text-red-500'>
          {errors.year_established.message}
        </p>
      )}

      <label
        htmlFor='website'
        className='mt-4 block text-lg font-medium text-gray-800'
      >
        Website:
      </label>
      <input
        {...register('website')}
        type='text'
        id='website'
        className={`mt-1 block w-full border p-2 ${
          errors.website ? 'border-red-500' : 'border-gray-300'
        } 
        rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
      />
      {errors.website && (
        <p className='mt-2 text-sm text-red-500'>{errors.website.message}</p>
      )}

      <button
        type='submit'
        className='mt-6 rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700'
      >
        Create Distillery
      </button>
    </form>
  )
}

export default NewDistilleryForm
