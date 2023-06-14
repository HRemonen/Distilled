import React from 'react'
import { useParams } from 'react-router-dom'

import useEntityReviews from '../../services/entityService'

import Typography from '../typography/Typography'
import Review from './Review'

const DistilleryDrawerReviews = () => {
  const { distilleryId } = useParams()
  const { reviewsInfo, isLoading } = useEntityReviews(distilleryId)

  if (isLoading || !reviewsInfo) return null

  const reviews = reviewsInfo.data

  if (!reviews) return null

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
