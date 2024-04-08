import React from 'react'
import { motion } from 'framer-motion'
import { Link, Outlet } from 'react-router-dom'
import NavItems from '../../Data/NavItems.json'
import Login from '../../Data/Login.json'

const Header: React.FC = () => {

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className='flex justify-between itmes-center sm:px-10 lg:px-14 xl:px-15 bg-slate-700'>
            <div className="w-full navbar gap-1 sm:gap-5 ">
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
              </div>
              <Link to="/" className="flex">
                <img src="./logo.png" alt="Logo" className='h-14 w-full' />
              </Link>
              <div className="flex-none hidden md:block">
                <ul className="menu menu-horizontal flex justify-center items-center gap-4">
                  {
                    NavItems.map((item) => (
                      <Link
                        className='text-lg text-white'
                        to={item.link} key={item.id}
                      >
                        {item.text}</Link>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className='flex justify-center items-center gap-4 px-4 '>
              {
                Login.map((item) => (
                  <motion.button
                    key={item.id}
                    color={item.color}
                    className="font-serif font-medium border  rounded-3xl px-4 py-1"
                    whileHover={{
                      scale: 1.03,
                    }}
                    style={{
                      background: item.bg,
                      color: item.color
                    }}
                    whileTap={{
                      scale: 0.99,
                    }}
                  >{item.text}</motion.button>
                ))
              }

            </div>
          </div>
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 min-h-full gap-1 bg-base-200 pt-20 rounded-xl">
            {/* Sidebar content here */}
            {
              NavItems.map((item) => (
                <motion.button
                  key={item.id}
                  variants={variants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className=' py-2 text-white text-center hover:bg-slate-700 text-md rounded-xl'
                >
                  {item.text}
                </motion.button>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
