import React, { useRef } from 'react'
import { useParams, useNavigate, Outlet } from 'react-router-dom'

import { useDistillery } from '../../services/distilleryService'

import Rating from '../ratings/Rating'
import CloseMenu from '../common/CloseMenu'
import Typography from '../typography/Typography'

import useClickOutside from '../../hooks/useClickOutside'
import DistilleryDrawerInfo from './DistilleryDrawerInfo'
import DistilleryDrawerTabs from './DistilleryDrawerTabs'

const DistilleryDrawer = () => {
  const drawerRef = useRef(null)
  const navigate = useNavigate()
  const { distilleryId } = useParams()
  const { distilleryInfo, isLoading } = useDistillery(distilleryId)
  useClickOutside(drawerRef, () => navigate(-1))

  if (isLoading || !distilleryInfo) return null

  return (
    <div
      ref={drawerRef}
      className='pin fixed left-0 top-0 z-40 h-screen w-[40%] border-r-2 border-gray-900 bg-gray-800 p-4'
    >
      <CloseMenu onClick={() => navigate(-1)} />
      <div className='mt-4'>
        <Typography variant='h4'>{distilleryInfo.data.name}</Typography>
      </div>
      <div>
        <Rating rating={distilleryInfo.data.rating} />
      </div>
      <DistilleryDrawerTabs />
      <Outlet />
    </div>
  )
}

export default DistilleryDrawer
