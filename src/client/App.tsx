import React from 'react'
import { Outlet } from 'react-router-dom'

import SearchBar from './components/map/SearchBar'
import RenderMap from './components/map/RenderMap'
import Logout from './components/authentication/Logout'

const App = () => (
  <section>
    <Outlet />
    <SearchBar />
    <RenderMap />
    <Logout />
  </section>
)

export default App
