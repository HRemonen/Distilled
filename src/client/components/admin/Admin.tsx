import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { useAuthenticatedUser } from '../../contexts/AuthContext'

import AdminTabs from './AdminTabs'

const Admin = () => {
  const navigate = useNavigate()
  const { user } = useAuthenticatedUser()

  useEffect(() => {
    if (user && user?.role !== 'admin') navigate('/')
  }, [navigate, user])

  useEffect(() => {
    const checkTokenExpiration = () => {
      const userToken = sessionStorage.getItem('token')
      if (userToken) {
        const { exp }: { exp: number } = jwt_decode(userToken)
        if (exp * 1000 < Date.now()) {
          console.log('TOKEN EXPIRED')
          navigate('/login')
        }
      }
    }

    const interval = setInterval(checkTokenExpiration, 5000)

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(interval)
    }
  }, [])

  if (!user) return null

  return (
    <section className='m-4 text-black'>
      <h1 className='text-2xl font-light uppercase'>Admin panel</h1>
      <AdminTabs />
      <Outlet />
    </section>
  )
}

export default Admin
