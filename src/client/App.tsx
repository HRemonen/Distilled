import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { AuthContext } from './contexts/AuthContext'

import SearchBar from './components/map/SearchBar'
import RenderMap from './components/map/RenderMap'
import Logout from './components/authentication/Logout'

const App = () => {
  const { logout } = useContext(AuthContext)

  const userToken = sessionStorage.getItem('token')
  if (userToken) {
    const { exp }: { exp: number } = jwt_decode(userToken)

    if (exp * 1000 < Date.now()) {
      console.log('TOKEN EXPIRED')
      logout()
    }
  }
  return (
    <section>
      <Outlet />
      <SearchBar />
      <RenderMap />
      <Logout />
    </section>
  )
}

export default App
