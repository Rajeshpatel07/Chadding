import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import { Header, Home } from './components/index.ts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Header />}>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
