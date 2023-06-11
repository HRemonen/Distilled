import React, { useMemo, useState } from 'react'
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'
import { useDistilleries } from '../../services/distilleryService'

import MapPin from './MapPin'
import DistilleryDrawer from '../distillery/DistilleryDrawer'

import { Distillery } from '../../validators/distillery_validator'
import Typography from '../typography/Typography'

const RenderMap = () => {
  const { distilleryData, isLoading } = useDistilleries()
  const [distillery, setDistillery] = useState<Distillery | null>(null)
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  })

  const distilleryMarkers = useMemo(
    () =>
      distilleryData?.data.map((distillery: Distillery) => (
        <Marker
          key={`distillery-${distillery.id}`}
          longitude={distillery.location[1]}
          latitude={distillery.location[0]}
          anchor='bottom'
          onClick={(e) => {
            e.originalEvent.stopPropagation()
            setDistillery(distillery)
            setViewState({
              longitude: distillery.location[1],
              latitude: distillery.location[0],
              zoom: 15,
            })
          }}
        >
          <div className='flex flex-col items-center'>
            <Typography variant='body2'>{distillery.name}</Typography>
            <MapPin size={20} />
          </div>
        </Marker>
      )),
    [distilleryData]
  )

  if (isLoading || !distilleryData) return null

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle='mapbox://styles/mapbox/dark-v9'
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
    >
      <GeolocateControl position='top-left' />
      <FullscreenControl position='top-left' />
      <NavigationControl position='top-left' />
      <ScaleControl />

      {distilleryMarkers}

      <DistilleryDrawer distillery={distillery} setDistillery={setDistillery} />
    </Map>
  )
}

export default RenderMap
