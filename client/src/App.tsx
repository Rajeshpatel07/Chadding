import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom"
import { NavBar, SideBar } from "./components"

const App: React.FC = () => {

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-inherit box-border md:flex-row">
        {width >= 768 &&
          <div className="md:flex-inline flex-col justify-center sticky top-0 h-screen p-3 w-fit md:flex  text-gray-100 dark:text-gray-800">
            <SideBar size={width} />
          </div>
        }
        <Outlet />
      </div>

      {width < 768 &&
        <div className="fixed bottom-0 bg-black">
          <SideBar size={width} />
        </div>
      }
    </>
  )
}

export default App
