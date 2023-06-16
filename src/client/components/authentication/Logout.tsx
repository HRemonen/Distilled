/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

import { AuthContext } from '../../contexts/AuthContext'
import Typography from '../typography/Typography'

const Logout = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('/')
    enqueueSnackbar('Logout success', {
      variant: 'success',
    })
  }

  return (
    <div className='pin fixed right-4 top-4 z-20'>
      {user ? (
        <div className='flex'>
          <Typography variant='body2'>{user.username}</Typography>
          <button
            type='button'
            className='block items-center justify-center text-sm font-semibold text-white transition hover:text-[#EA5555]'
            onClick={onLogout}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='ml-2'
            >
              <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
              <polyline points='16 17 21 12 16 7' />
              <line x1='21' y1='12' x2='9' y2='12' />
            </svg>
          </button>
        </div>
      ) : (
        <Link
          to='/login'
          className='flex text-sm font-semibold text-white transition hover:text-gray-500'
        >
          <span className='block items-center justify-center text-sm font-semibold'>
            Login
          </span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            className='ml-1'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9m6-9-4-4m4 4-4 4m4-4H5'
            />
          </svg>
        </Link>
      )}
    </div>
  )
}

export default Logout
