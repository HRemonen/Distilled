import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { AuthContext, useAuthenticatedUser } from './contexts/AuthContext'

import SearchBar from './components/map/SearchBar'
import RenderMap from './components/map/RenderMap'
import Logout from './components/authentication/Logout'

const WhiskeyButton = () => {
  const { user } = useAuthenticatedUser()

  if (user?.role !== 'admin') return null

  return (
    <Link to='/admin'>
      <img
        className='pin fixed bottom-8 right-4 z-20'
        width='40'
        height='40'
        alt='admin-menu'
        src='./assets/tumbler-glass_1f943.webp'
      />
    </Link>
  )
}

const App = () => {
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    const checkTokenExpiration = () => {
      const userToken = sessionStorage.getItem('token')
      if (userToken) {
        const { exp }: { exp: number } = jwt_decode(userToken)
        if (exp * 1000 < Date.now()) {
          console.log('TOKEN EXPIRED')
          logout()
        }
      }
    }

    const interval = setInterval(checkTokenExpiration, 5000)

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <section>
      <Outlet />
      <SearchBar />
      <RenderMap />
      <Logout />
      <WhiskeyButton />
    </section>
  )
}

export default App
