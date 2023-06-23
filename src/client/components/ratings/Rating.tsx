import React from 'react'

import RenderStars from './RenderStars'
import Typography from '../typography/Typography'

import { RatingType } from '../../types'

const Rating = ({ rating }: { rating: RatingType }) => {
  if (!rating) return null

  const totalCount = Object.values(rating).reduce(
    (acc, count) => acc + count,
    0
  )

  const totalRating = Object.entries(rating).reduce(
    (acc, [rating, count]) => acc + parseInt(rating, 10) * count,
    0
  )

  const avgRating = totalCount !== 0 ? totalRating / totalCount : 0.0

  const roundedRating = Math.round(avgRating * 10) / 10

  return (
    <div className='mt-4 border-t-2'>
      <div className='my-3 flex items-center'>
        <RenderStars avgRating={avgRating} />
        <Typography variant='body2'>{roundedRating} out of 5</Typography>
      </div>
      <Typography variant='body2'>{totalCount} global ratings</Typography>
    </div>
  )
}

export default Rating
