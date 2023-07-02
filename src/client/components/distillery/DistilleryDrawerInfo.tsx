import React from 'react'
import { useParams } from 'react-router-dom'

import { useDistillery } from '../../services/distilleryService'

import Typography from '../typography/Typography'

const DistilleryDrawerInfo = () => {
  const { distilleryId } = useParams()
  const { distilleryInfo, isLoading } = useDistillery(distilleryId)

  if (isLoading || !distilleryInfo) return null

  return (
    <div>
      <Typography variant='h6' className='mt-4'>
        Information
      </Typography>
      <div className='mt-4 grid grid-cols-10 gap-x-2 pl-2'>
        <svg
          className='col-span-1 fill-gray-400'
          viewBox='0 0 16 16'
          version='1.1'
          width='16'
          height='16'
          aria-hidden='true'
        >
          <path d='m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z' />
        </svg>
        <Typography variant='body2' className='col-span-9'>
          {distilleryInfo.data.location[0]} - {distilleryInfo.data.location[1]},{' '}
          {distilleryInfo.data.country}
        </Typography>

        {distilleryInfo.data.website ? (
          <>
            <svg
              className='col-span-1 fill-gray-400'
              aria-hidden='true'
              height='16'
              viewBox='0 0 16 16'
              version='1.1'
              width='16'
              data-view-component='true'
            >
              <path d='m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z' />
            </svg>
            <Typography
              variant='link'
              href={distilleryInfo.data.website}
              className='col-span-9'
            >
              {distilleryInfo.data.website}
            </Typography>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default DistilleryDrawerInfo
