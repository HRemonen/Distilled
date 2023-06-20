/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import { AuthProvider } from './contexts/AuthContext'
import queryClient from './util/queryClient'

import App from './App'
import Admin from './components/admin/Admin'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import DistilleryDrawer from './components/distillery/DistilleryDrawer'
import DistilleryDrawerInfo from './components/distillery/DistilleryDrawerInfo'
import DistilleryDrawerWhiskeys from './components/whiskey/DistilleryDrawerWhiskeys'
import DistilleryDrawerComments from './components/reviews/DistilleryDrawerReviews'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'distillery/:distilleryId',
        element: <DistilleryDrawer />,
        children: [
          {
            index: true,
            element: <DistilleryDrawerInfo />,
          },
          {
            path: 'whiskeys',
            element: <DistilleryDrawerWhiskeys />,
          },
          {
            path: 'reviews',
            element: <DistilleryDrawerComments />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        index: true,
        element: <DistilleryDrawerInfo />,
      },
      {
        path: 'modify-distilleries',
        element: <DistilleryDrawerWhiskeys />,
      },
      {
        path: 'modify-whiskeys',
        element: <DistilleryDrawerComments />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider preventDuplicate>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
