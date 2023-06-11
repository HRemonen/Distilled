import React from 'react'

import { RatingType } from '../../types'
import Typography from '../typography/Typography'

const RatingStar = () => (
  <svg
    aria-hidden='true'
    className='h-5 w-5 text-yellow-400'
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
  </svg>
)

const MissingStar = () => (
  <svg
    aria-hidden='true'
    className='h-5 w-5 text-gray-300 dark:text-gray-500'
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
  </svg>
)

const RenderStars = ({ avgRating }: { avgRating: number }) => {
  const fullStars = Math.floor(avgRating)

  const render = (index: number) => {
    if (index <= fullStars) {
      return <RatingStar key={index} />
    }
    return <MissingStar key={index} />
  }

  return (
    <div className='mr-2 flex'>
      {[...Array(5)].map((_, index) => render(index))}
    </div>
  )
}

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

  return (
    <div className='mt-4 border-t-2'>
      <div className='my-3 flex items-center'>
        <RenderStars avgRating={avgRating} />
        <Typography variant='body2'>{avgRating} out of 5</Typography>
      </div>
      <Typography variant='body2'>{totalCount} global ratings</Typography>
    </div>
  )
}

export default Rating
