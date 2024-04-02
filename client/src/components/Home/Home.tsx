import React from 'react'
import Carsual from './Carsual'

const Home: React.FC = () => {
  return (
    <div className='flex items-center justify-center' >
      <main className=' h-screen px-2 w-90 flex justify-center sm:px-5 md:px-8 lg:px-10 xl:px-16  '>
        <section className='w-full flex  flex-col items-center'>
          <section className='bg-blue-500 w-full h-2/6 rounded-xl sm:h-3/6 md:h-4/6 lg:h-5/6 xl:6/6 mt-5 '>
            <div className="hero h-full rounded-xl " style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                  <p className="mb-5"></p>
                </div>
              </div>
            </div>
          </section>
          <Carsual link="Top Live " />
          <Carsual link="Esports" />
          <Carsual link="Popular" />
          {/* Other elements*/}
        </section>
      </main>
    </div>
  )
}

export default Home
