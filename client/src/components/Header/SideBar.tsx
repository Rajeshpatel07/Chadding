import React from 'react'
import SideItems from '../../Data/SidebarItems.json'
import { Link } from 'react-router-dom';


const SideBar: React.FC<{ size: number }> = ({ size }) => {

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-center">
          <ul className={size > 768 ? 'flex flex-col gap-8' : 'py-3 flex items-center justify-around w-screen'}>
            <Icons />
          </ul>
        </div>
      </div>
    </>
  )
}

export default SideBar;


const Icons: React.FC = () => {

  return (
    <>
      {
        SideItems.map(item => (
          <li className="rounded-sm  no-underline" key={item.Title}>
            <Link to={item.route} className="flex items-center p-2 space-x-3 rounded-md hover:scale-105 duration-200 ">
              <svg xmlns="http://www.w3.org/2000/svg" aria-label={item.Title} viewBox={item.ViewBox} className="w-6 h-6 fill-current text-gray-400 dark:text-gray-600">
                <path d={item.Path} className='text-white'></path>
              </svg>
            </Link>
          </li>
        ))
      }
    </>
  )
}
