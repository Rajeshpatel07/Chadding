import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavItems from '../../Data/NavItems.json'
import Login from '../Dialogs/Login'
import Signup from '../Dialogs/Signup'


const NavBar: React.FC = () => {

  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ID = JSON.parse(localStorage.getItem("UserId"));
    setActive(ID);
  }, [])


  return (
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
      {active ?
        <div className='flex justify-center items-center gap-4 px-4 '>
          <div className="avatar flex items-center">
            <div className="w-12 h-12 rounded-full">
              <Link to="/profile">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </Link>
            </div>
          </div>
        </div>
        :
        <div className='flex justify-center items-center gap-4 px-4 '>
          <Signup text="SIGNUP" />
          <Login text="LOGIN" />
        </div>
      }
    </div>
  )
}

export default NavBar;
