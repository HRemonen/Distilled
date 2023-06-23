/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useEntityReviews } from '../../services/entityService'
import { useAuthenticatedUser } from '../../contexts/AuthContext'

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
  const { user } = useAuthenticatedUser()
  const [openReview, setOpenReview] = useState(false)

  const { reviewsInfo, isLoading } = useEntityReviews(distilleryId)

  if (isLoading || !distilleryId) return null

  const userReview = reviewsInfo?.data.find(
    (review) => review.username === user?.username
  )

  if (openReview && !userReview) {
    return (
      <ReviewForm
        entityId={distilleryId}
        close={() => setOpenReview(!openReview)}
      />
    )
  }

  return (
    <div className='h-[80vh] overflow-y-scroll scrollbar-hide'>
      {userReview ? (
        <div>
          <Typography variant='body2'>
            You have already given a review for this distillery
          </Typography>
          <Review review={userReview} />
        </div>
      ) : user ? (
        <div className='flex justify-center'>
          <button
            type='button'
            className='mb-2 mr-2 inline-flex items-center self-center rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-600'
            onClick={() => setOpenReview(!openReview)}
          >
            Write a review
          </button>
        </div>
      ) : null}
      {reviewsInfo?.data.length === 0 ? (
        <MissingReviews />
      ) : (
        <div className=''>
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
