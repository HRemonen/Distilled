import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import useEntityReviews from '../../services/entityService'

import Review from './Review'
import ReviewForm from './ReviewForm'
import Typography from '../typography/Typography'

const MissingReviews = () => (
  <div className='m-4'>
    <Typography variant='h6'>
      Be the first one to review this distillery!
    </Typography>
    <Typography variant='body2' className='mt-4'>
      Look&lsquo;s like there is no reviews for this distillery yet. <br />
      You can be the first one to drop a review if you wish!
    </Typography>
  </div>
)

const DistilleryDrawerReviews = () => {
  const { distilleryId } = useParams()
  const [openReview, setOpenReview] = useState(false)

  const { reviewsInfo, isLoading, isError } = useEntityReviews(distilleryId)

  if (isLoading) return null

  if (openReview) {
    return <ReviewForm close={() => setOpenReview(!openReview)} />
  }

  return (
    <div>
      <div className='flex justify-center'>
        <button
          type='button'
          className='mb-2 mr-2 inline-flex items-center self-center rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-600'
          onClick={() => setOpenReview(!openReview)}
        >
          Write a review
        </button>
      </div>
      {isError ? (
        <MissingReviews />
      ) : (
        <div>
          <Typography variant='h6' className='mt-4'>
            Reviews
          </Typography>
          {reviewsInfo?.data.map((review) => (
            <Review key={review.rating_id} review={review} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DistilleryDrawerReviews
