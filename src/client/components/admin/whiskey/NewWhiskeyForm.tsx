/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { enqueueSnackbar } from 'notistack'

import { useCreateWhiskey } from '../../../services/whiskeyService'

import InputField from '../InputField'
import SelectField from '../SelectField'

import {
  NewWhiskey,
  NewWhiskeyZod,
} from '../../../validators/whiskey_validator'

import whiskeyTypes from '../../../assets/whiskeyTypes.json'
import { useDistillery } from '../../../services/distilleryService'

const NewWhiskeyForm = () => {
  const navigate = useNavigate()
  const { distilleryId } = useParams()
  const { distilleryInfo } = useDistillery(distilleryId)
  const mutateWhiskeys = useCreateWhiskey(distilleryId)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewWhiskey>({
    resolver: zodResolver(NewWhiskeyZod),
    defaultValues: {
      distillery_id: distilleryId,
      description: '',
    },
  })

  const onSubmit = (data: NewWhiskey) => {
    mutateWhiskeys
      .mutateAsync(data)
      .then(() => {
        navigate(-1)
        enqueueSnackbar('Whiskey creation successful', {
          variant: 'success',
        })
      })
      .catch((error) => {
        enqueueSnackbar(`Whiskey creation failed: ${error.message}`, {
          variant: 'error',
        })
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
      <h2 className='text-2xl font-semibold text-black'>
        Create New Whiskey for {distilleryInfo?.data.name}
      </h2>
      <InputField
        register={register('name')}
        id='name'
        label='Name *'
        type='text'
        error={errors.name}
      />

      <SelectField
        register={register('type')}
        id='type'
        label='Whiskey type *'
        error={errors.type}
      >
        <option value=''>-- Select Type --</option>
        {whiskeyTypes.map((type) => (
          <option key={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </SelectField>

      <InputField
        register={register('age', { valueAsNumber: true })}
        id='age'
        label='Age *'
        type='number'
        error={errors.age}
      />

      <InputField
        register={register('description')}
        id='description'
        label='Description'
        type='text'
        error={errors.description}
      />

      <button
        type='submit'
        className='mt-6 rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700'
      >
        Create Whiskey
      </button>
    </form>
  )
}

export default NewWhiskeyForm
