/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticatedUser } from '../../contexts/AuthContext'

import { Review, ReviewZod } from '../../validators/entity_validator'
import TextArea from '../form/TextArea'
import StarRating from '../form/StarRating'

const ReviewForm = ({ close }: { close: () => void }) => {
  const { user, config } = useAuthenticatedUser()
  const {
    register,
    handleSubmit,
    setValue,
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

  const handleRatingChange = (rating: number) => {
    setValue('rating', rating)
  }

  return (
    <div className='flex items-center justify-center text-left'>
      <div className='mt-8 w-[80%]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StarRating
            id='rating'
            name='rating'
            label='Rating'
            onRatingChange={handleRatingChange}
          />
          <TextArea
            id='comment'
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
