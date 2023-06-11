import React from 'react'
import { Popup } from 'react-map-gl'

import { Distillery } from '../../validators/distillery_validator'
import { useDistillery } from '../../services/distilleryService'

type PopUpProps = {
  distillery: Distillery | null
  setDistillery: React.Dispatch<React.SetStateAction<Distillery | null>>
}

const DistilleryPopUp = ({ distillery, setDistillery }: PopUpProps) => {
  const { distilleryInfo, isLoading } = useDistillery(distillery?.id)

  if (isLoading || !distilleryInfo) return null

  return (
    <Popup
      anchor='top'
      longitude={distilleryInfo.data.location[1]}
      latitude={distilleryInfo.data.location[0]}
      onClose={() => setDistillery(null)}
    >
      <div>
        {distilleryInfo.data.name}, {distilleryInfo.data.country}
      </div>
    </Popup>
  )
}

export default DistilleryPopUp
