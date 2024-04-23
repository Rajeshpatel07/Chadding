import React from 'react'
// import Chat from '../Video/Chat'

const Stream = () => {
  return (
    <div className='flex items-center justify-center' >
      <main className=' h-screen w-full px-2  flex justify-center gap-5 sm:px-5 md:px-8 lg:px-10 xl:px-10 mt-8 '>
        <div className='w-full xl:flex gap-8'>
          <section className='flex flex-col items-center xl:w-11/12'>
            <section className='w-full h-2/6 rounded-xl sm:h-3/6 md:h-4/6 lg:h-5/6 xl:h-6/6  '>
              <div className="hero h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[80vh] rounded-xl " style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
              </div>
            </section>
          </section>

          <div className='h-full mt-5 xl:w-4/12 xl:mt-0 '>
            {/* <Chat /> */}
          </div>
        </div>
        {/* chat */}
      </main>
    </div>

  )
}

export default Stream
