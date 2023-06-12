import React, { useMemo } from 'react'
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'
import { Link } from 'react-router-dom'

import { useDistilleries } from '../../services/distilleryService'

import MapPin from './MapPin'
import Typography from '../typography/Typography'

import { Distillery } from '../../validators/distillery_validator'

const RenderMap = () => {
  const { distilleryData, isLoading } = useDistilleries()
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  })

  const distilleryMarkers = useMemo(
    () =>
      distilleryData?.data.map((distillery: Distillery) => (
        <Link
          to={`./distillery/${distillery.id}`}
          key={`distillery-${distillery.id}`}
        >
          <Marker
            longitude={distillery.location[1]}
            latitude={distillery.location[0]}
            anchor='bottom'
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setViewState({
                longitude: distillery.location[1],
                latitude: distillery.location[0],
                zoom: 15,
              })
            }}
          >
            <div className='flex cursor-pointer flex-col items-center'>
              <Typography variant='body2'>{distillery.name}</Typography>
              <MapPin size={20} />
            </div>
          </Marker>
        </Link>
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
    </Map>
  )
}

export default RenderMap
