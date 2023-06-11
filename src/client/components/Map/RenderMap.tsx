import React, { useMemo, useState } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'
import { useDistilleries } from '../../services/distilleryService'

import MapPin from './MapPin'

import { Distillery } from '../../validators/distillery_validator'

const RenderMap = () => {
  const { distilleryData, isLoading } = useDistilleries()
  const [popUp, setPopUp] = useState<Distillery>()

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
            setPopUp(distillery)
          }}
        >
          <MapPin size={20} />
        </Marker>
      )),
    [distilleryData]
  )

  if (isLoading || !distilleryData) return null

  return (
    <Map
      initialViewState={{
        latitude: 40,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      }}
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
