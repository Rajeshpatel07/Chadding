import React, { useEffect, useState, Suspense } from 'react';
import Carsual from './Carsual';
import Footer from '../Footer/Footer';
import { liveStreamsInterface } from '../../services/Interfaces';
import axios from 'axios';
import Loading from '../Loading/Loading';

const Home: React.FC = () => {
  const [liveStream, setLiveStream] = useState<Array<liveStreamsInterface>>([])

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get("/api/livestreams");
        console.log(response);
        setLiveStream(response.data);
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  // console.log("liveStream", liveStream);

  return (
    <Suspense fallback={<Loading />}>
      <div className='flex items-center justify-center w-[99vw]' >
        <main className=' h-screen px-2 w-full flex flex-col items-center sm:px-5 md:px-8 lg:px-10 xl:px-16  '>
          <section className=' flex  flex-col items-center w-full mt-5'>
            <section className='w-full h-[30vh] rounded-xl md:h-[60vh] lg:h-[80vh] '>
              <div className="hero w-full h-full  rounded-xl " style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
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
            <Carsual link="Top Live " Stream={liveStream} />
            {/* <Carsual link="Esports"  /> */}
            {/* <Carsual link="Popular" /> */}
            {/* <Carsual link="Popular" /> */}
            {/* <Carsual link="Popular" /> */}
          </div>
          <Footer />
        </main>
      </div>

    </Suspense>
  )
}

export default Home;
