/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import InputField from './InputField'

import {
  NewDistillery,
  NewDistilleryZod,
} from '../../validators/distillery_validator'

import countryCodes from '../../assets/countryCodes.json'

const NewDistilleryForm = () => {
  const currentYear = new Date().getFullYear()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewDistillery>({
    resolver: zodResolver(NewDistilleryZod),
    defaultValues: {
      website: '',
    },
  })

  const onSubmit = (data: NewDistillery) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
      <InputField
        register={register('name')}
        id='name'
        label='Name'
        type='text'
        error={errors.name}
      />

      <div className='flex'>
        <div className='w-1/2'>
          <InputField
            register={register('location.0', { valueAsNumber: true })}
            id='location.0'
            label='Location Latitude'
            type='number'
            step='any'
            error={errors.location?.[0]}
          />
        </div>

        <div className='w-1/2 pl-4'>
          <InputField
            register={register('location.1', { valueAsNumber: true })}
            id='location.1'
            label='Location Longitude'
            type='number'
            step='any'
            error={errors.location?.[1]}
          />
        </div>
      </div>

      <label
        htmlFor='country'
        className='mt-4 block text-lg font-medium text-gray-800'
      >
        Country:
      </label>
      <select
        id='country'
        {...register('country')}
        className={`mt-1 block w-full border p-2 ${
          errors.country ? 'border-red-500' : 'border-gray-300'
        } 
      rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
      >
        <option value=''>-- Select Country --</option>
        {countryCodes.map((country) => (
          <option key={country['country-code']} value={country['alpha-3']}>
            {country.name}
          </option>
        ))}
      </select>
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
          { length: currentYear - 0 + 1 },
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

      <InputField
        register={register('website')}
        id='website'
        label='Website'
        type='text'
        error={errors.website}
      />

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
