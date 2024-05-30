import React from 'react'
import SideItems from '../../Data/SidebarItems.json'
import { Link } from 'react-router-dom';


const SideBar: React.FC = () => {

  return (
    <div className="md:flex-inline flex-col justify-center sticky top-0 h-screen p-3 w-fit hidden md:flex  text-gray-100 dark:text-gray-800">
      <div className="space-y-3">
        <div className="flex-1 items-center">
          <ul className="pt-2 pb-4 space-y-6 text-sm">
            <Icons />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar;


const Icons: React.FC = () => {

  return (
    <>
      {
        SideItems.map(item => (
          <li className="rounded-sm" key={item.Title}>
            <Link to={item.route} className="flex items-center p-2 space-x-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox={item.ViewBox} className="w-5 h-5 fill-current text-gray-400 dark:text-gray-600">
                <path d={item.Path} className='text-white'></path>
              </svg>
            </Link>
          </li>
        ))
      }
    </>
  )
}
