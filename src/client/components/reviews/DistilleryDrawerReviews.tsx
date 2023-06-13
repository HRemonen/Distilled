import React from 'react'
import { useParams } from 'react-router-dom'

import { useDistillery } from '../../services/distilleryService'

import Typography from '../typography/Typography'
import Comment from './Review'

const DistilleryDrawerReviews = () => {
  const { distilleryId } = useParams()
  const { distilleryInfo, isLoading } = useDistillery(distilleryId)

  if (isLoading || !distilleryInfo) return null

  const { reviews } = distilleryInfo.data

  if (!reviews) return null

  return (
    <div>
      <Typography variant='h6' className='mt-4'>
        Reviews
      </Typography>
      {reviews.map((review) => (
        <Comment key={review.username} review={review} />
      ))}
    </div>
  )
}

export default DistilleryDrawerReviews
