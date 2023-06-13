import React from 'react'
import { useParams } from 'react-router-dom'

import { useDistillery } from '../../services/distilleryService'

import Typography from '../typography/Typography'
import Comment from './Comment'

const DistilleryDrawerComments = () => {
  const { distilleryId } = useParams()
  const { distilleryInfo, isLoading } = useDistillery(distilleryId)

  if (isLoading || !distilleryInfo) return null

  const { comments } = distilleryInfo.data

  return (
    <div>
      <Typography variant='h6' className='mt-4'>
        Comments
      </Typography>
      {comments.map((comment) => (
        <Comment key={comment.username} comment={comment} />
      ))}
    </div>
  )
}

export default DistilleryDrawerComments
