import React from 'react';
import Carsual from './Carsual';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Home: React.FC = () => {
  return (
    <div className='flex items-center justify-center' >
      <main className=' h-screen px-2  flex flex-col items-center sm:px-5 md:px-8 lg:px-10 xl:px-16  '>
        <section className='w-full flex  flex-col items-center'>
          <section className='w-full h-2/6 rounded-xl sm:h-3/6 md:h-4/6 lg:h-5/6 xl:6/6 mt-5 '>
            <div className="hero h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[80vh] rounded-xl " style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                  <p className="mb-5"></p>
                </div>
              </div>
            </div>
          </section>
        </section>
        <div className='mt-5'>
          <Carsual link="Top Live " />
          <Carsual link="Esports" />
          <Carsual link="Popular" />
          <Carsual link="Popular" />
          <Carsual link="Popular" />
        </div>
        <Footer />
      </main>
      <div className='absolute'>
        <Link to="/video" className='px-4 py-2 bg-blue-500 bottom-1 right-1'>Go to video</Link>
      </div>
    </div>
  )
}

export default Home;
