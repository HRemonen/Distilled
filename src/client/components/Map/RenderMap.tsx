import React, { useEffect, useMemo } from 'react'
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'
import { Link, useParams } from 'react-router-dom'

import { useDistilleries } from '../../services/distilleryService'

import MapPin from './MapPin'
import Typography from '../typography/Typography'

import { Distillery } from '../../validators/distillery_validator'

const RenderMap = () => {
  const { distilleryId } = useParams()
  const { distilleryData, isLoading } = useDistilleries()
  const [viewState, setViewState] = React.useState({
    longitude: 19,
    latitude: 56,
    zoom: 3.5,
  })

  useEffect(() => {
    const distillery = distilleryData?.data.find(
      (distillery) => distillery.id === distilleryId
    )
    if (distillery) {
      setViewState({
        longitude: distillery.location[1] - 0.007,
        latitude: distillery.location[0],
        zoom: 15,
      })
    }
  }, [distilleryId, distilleryData])

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
      mapboxAccessToken={process.env.MAPBOX_KEY}
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
