import React from 'react'
import { useParams } from 'react-router-dom'

import useEntityReviews from '../../services/entityService'

import Typography from '../typography/Typography'
import Review from './Review'

const DistilleryDrawerReviews = () => {
  const { distilleryId } = useParams()
  const { reviewsInfo, isLoading, isError } = useEntityReviews(distilleryId)

  if (isLoading) return null

  if (isError || !reviewsInfo?.data)
    return (
      <div>
        <Typography variant='h6'>
          Be the first one to review this distillery!
        </Typography>
      </div>
    )

  const reviews = reviewsInfo.data

  return (
    <div>
      <Typography variant='h6' className='mt-4'>
        Reviews
      </Typography>
      {reviews.map((review) => (
        <Review key={review.rating_id} review={review} />
      ))}
    </div>
  )
}

export default DistilleryDrawerReviews
