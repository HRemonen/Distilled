import React, { useState } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'
import { useDistilleries } from './services/distilleryService'

const App = () => {
  const { distilleryData, isLoading } = useDistilleries()
  const [popUp, setPopUp] = useState(null)

  if (isLoading) return null

  console.log(distilleryData)

  return (
    <div>
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
      </Map>
    </div>
  )
}

export default App
