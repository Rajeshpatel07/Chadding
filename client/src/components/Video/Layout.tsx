import React from 'react'
import Chat from './Chat';
import Video from './Video';


const Layout: React.FC = () => {


  return (
    <div className="w-[100vw] md:w-[96.5vw] h-auto">
      <div className="flex flex-col justify-center  py-4 xl:py-6 mx-auto bg-gray-800">
        <section className='flex flex-col justify-center gap-3 lg:flex-row box-border'>
          <div className='flex flex-col justify-start lg:w-[73%]'>
            <Video />
          </div>
          <div className='w-full lg:w-[24%]   '>
            <Chat />
          </div>
        </section>
      </div>
    </div >
  )
}

export default Layout; 
