import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthenticatedUser } from '../../contexts/AuthContext'

import AdminTabs from './AdminTabs'
import Typography from '../typography/Typography'

const Admin = () => {
  const navigate = useNavigate()
  const { user } = useAuthenticatedUser()

  useEffect(() => {
    if (user && user?.role !== 'admin') navigate('/')
  }, [navigate, user])

  if (!user) return null

  return (
    <section className='m-4'>
      <Typography variant='h3' className='text-black'>
        Admin panel
      </Typography>
      <AdminTabs />
    </section>
  )
}

export default Admin
