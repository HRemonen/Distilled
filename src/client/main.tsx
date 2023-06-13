/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import queryClient from './util/queryClient'

import App from './App'
import DistilleryDrawer from './components/distillery/DistilleryDrawer'
import DistilleryDrawerInfo from './components/distillery/DistilleryDrawerInfo'

import './index.css'
import DistilleryDrawerWhiskeys from './components/whiskey/DistilleryDrawerWhiskeys'
import DistilleryDrawerComments from './components/comments/DistilleryDrawerComments'

const router = createBrowserRouter([
  {
    path: '/maps',
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
            path: 'comments',
            element: <DistilleryDrawerComments />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
