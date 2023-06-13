import React from 'react'

import RenderStars from '../ratings/RenderStars'

import { EntityReview } from '../../types'

const Comment = ({ review }: { review: EntityReview }) => {
  const createdDate = new Date(review.created_at).toLocaleDateString()

  return (
    <article className='my-4 border-b border-gray-500 pl-2'>
      <div className='mb-4 flex items-center space-x-4'>
        <div className='space-y-1 font-medium text-white'>
          <p>{review.username}</p>
        </div>
      </div>
      <RenderStars avgRating={review.rating} />
      <footer className='mb-5 text-sm text-gray-400'>
        <p>
          Reviewed on <time dateTime={review.created_at}>{createdDate}</time>
        </p>
      </footer>
      <p className='mb-4 text-gray-400'>{review.comment}</p>
    </article>
  )
}

export default Comment
