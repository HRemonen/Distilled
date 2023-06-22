/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { enqueueSnackbar } from 'notistack'

import { useCreateDistillery } from '../../../services/distilleryService'

import InputField from '../InputField'
import SelectField from '../SelectField'

import {
  NewDistillery,
  NewDistilleryZod,
} from '../../../validators/distillery_validator'

import countryCodes from '../../../assets/countryCodes.json'

const NewDistilleryForm = () => {
  const currentYear = new Date().getFullYear()
  const mutateDistilleries = useCreateDistillery()
  const navigate = useNavigate()

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
    mutateDistilleries
      .mutateAsync(data)
      .then(() => {
        navigate('/admin/modify-distilleries')
        enqueueSnackbar('Distillery creation successful', {
          variant: 'success',
        })
      })
      .catch((error) => {
        enqueueSnackbar(`Distillery creation failed: ${error.message}`, {
          variant: 'error',
        })
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
      <InputField
        register={register('name')}
        id='name'
        label='Name *'
        type='text'
        error={errors.name}
      />

      <div className='flex'>
        <div className='w-1/2'>
          <InputField
            register={register('location.0', { valueAsNumber: true })}
            id='location.0'
            label='Location Latitude *'
            type='number'
            step='any'
            error={errors.location?.[0]}
          />
        </div>

        <div className='w-1/2 pl-4'>
          <InputField
            register={register('location.1', { valueAsNumber: true })}
            id='location.1'
            label='Location Longitude *'
            type='number'
            step='any'
            error={errors.location?.[1]}
          />
        </div>
      </div>

      <SelectField
        register={register('country')}
        id='country'
        label='Country *'
        error={errors.country}
      >
        <option value=''>-- Select Country --</option>
        {countryCodes.map((country) => (
          <option key={country['country-code']} value={country['alpha-3']}>
            {country.name}
          </option>
        ))}
      </SelectField>

      <SelectField
        register={register('year_established', { valueAsNumber: true })}
        id='yearEstablished'
        label='Year Established *'
        error={errors.year_established}
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
      </SelectField>

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
