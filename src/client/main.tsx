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
import AdminInfo from './components/admin/AdminInfo'
import EditDistillery from './components/admin/distillery/EditDistillery'
import NewDistilleryForm from './components/admin/distillery/NewDistilleryForm'
import EditDistilleryForm from './components/admin/distillery/EditDistilleryForm'
import EditWhiskey from './components/admin/whiskey/EditWhiskey'
import NewWhiskeyForm from './components/admin/whiskey/NewWhiskeyForm'
import EditWhiskeyForm from './components/admin/whiskey/EditWhiskeyForm'

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
        element: <AdminInfo />,
      },
      {
        path: 'modify-distilleries',
        element: <EditDistillery />,
      },
      {
        path: 'modify-whiskeys',
        element: <EditWhiskey />,
      },
      {
        path: 'new-distillery',
        element: <NewDistilleryForm />,
      },
      {
        path: 'new-whiskey/:distilleryId',
        element: <NewWhiskeyForm />,
      },
      {
        path: 'edit-distillery/:distilleryId',
        element: <EditDistilleryForm />,
      },
      {
        path: 'edit-whiskey/:whiskeyId',
        element: <EditWhiskeyForm />,
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
