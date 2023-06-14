import React from 'react'
import { Outlet } from 'react-router-dom'

import SearchBar from './components/map/SearchBar'
import RenderMap from './components/map/RenderMap'

const App = () => (
  <section>
    <Outlet />
    <SearchBar />
    <RenderMap />
  </section>
)

export default App
