import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import { Home, Profile, Stream, Video } from './components/index.ts'
import App from './App.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='stream' element={<Stream />} />
      <Route path='profile' element={<Profile />} />
      <Route path='video' element={<Video />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
