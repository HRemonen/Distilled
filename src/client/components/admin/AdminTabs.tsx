import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminTabs = () => (
  <div className='my-4 border-b border-gray-700 text-center text-sm font-medium text-gray-400'>
    <ul className='-mb-px flex flex-wrap'>
      <li className='mr-4'>
        <NavLink
          end
          to='.'
          className={({ isActive }) =>
            isActive ? 'border-b border-blue-500' : ''
          }
        >
          Information
        </NavLink>
      </li>
      <li className='mr-4'>
        <NavLink
          to='./modify-distilleries'
          className={({ isActive }) =>
            isActive ? 'border-b border-blue-500' : ''
          }
        >
          Distilleries
        </NavLink>
      </li>
      <li className='mr-4'>
        <NavLink
          to='./modify-whiskeys'
          className={({ isActive }) =>
            isActive ? 'border-b border-blue-500' : ''
          }
        >
          Whiskeys
        </NavLink>
      </li>
    </ul>
  </div>
)

export default AdminTabs
