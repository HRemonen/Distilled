import React from 'react'
import { Outlet } from 'react-router-dom'

import RenderMap from './components/map/RenderMap'

const App = () => (
  <section>
    <RenderMap />
    <Outlet />
  </section>
)

export default App
