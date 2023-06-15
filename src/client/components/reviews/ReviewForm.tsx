/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticatedUser } from '../../contexts/AuthContext'

import { Review, ReviewZod } from '../../validators/entity_validator'
import TextArea from '../form/TextArea'

const ReviewForm = ({ close }: { close: () => void }) => {
  const { user, config } = useAuthenticatedUser()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Review>({
    mode: 'onBlur',
    resolver: zodResolver(ReviewZod),
  })

  if (!user) return null

  const onSubmit = (data: Review) => {
    console.log(data)
    close()
  }

  return (
    <div className='flex items-center justify-center text-left'>
      <div className='mt-8 w-[80%]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextArea
            id='comment'
            type='comment'
            name='comment'
            label='Comment'
            register={register}
            error={errors.comment}
          />

          <button
            id='review-submit-button'
            data-cy='review-submit-button'
            type='submit'
            className='mb-2 mr-2 inline-flex items-center self-center rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-600'
          >
            Submit review
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReviewForm
