import React, { useRef } from 'react'

import { useDistillery } from '../../services/distilleryService'

import CloseMenu from '../common/CloseMenu'

import { Distillery } from '../../validators/distillery_validator'
import useClickOutside from '../../hooks/useClickOutside'

type PopUpProps = {
  distillery: Distillery | null
  setDistillery: React.Dispatch<React.SetStateAction<Distillery | null>>
}

const DistilleryDrawer = ({ distillery, setDistillery }: PopUpProps) => {
  const drawerRef = useRef(null)
  const { distilleryInfo, isLoading } = useDistillery(distillery?.id)

  useClickOutside(drawerRef, () => setDistillery(null))

  if (isLoading || !distilleryInfo) return null

  return (
    <div
      ref={drawerRef}
      className='pin fixed left-0 top-0 z-40 h-screen w-[40%] border-r-2 border-gray-900 bg-gray-800 p-4'
    >
      <CloseMenu onClick={() => setDistillery(null)} />
    </div>
  )
}

export default DistilleryDrawer
