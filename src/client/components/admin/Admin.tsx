import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAuthenticatedUser } from '../../contexts/AuthContext'

import AdminTabs from './AdminTabs'

const Admin = () => {
  const navigate = useNavigate()
  const { user } = useAuthenticatedUser()

  useEffect(() => {
    if (user && user?.role !== 'admin') navigate('/')
  }, [navigate, user])

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
