import React, { lazy, useEffect, useState, Suspense } from 'react';
const Carsual = lazy(() => import('./Carsual'))
import { liveStreamsInterface } from '../../services/Interfaces';
import axios from 'axios';
const Loading = lazy(() => import("../Extra/Loading"))
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [liveStream, setLiveStream] = useState<Array<liveStreamsInterface>>([])

  useEffect(() => {
    (async function () {
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
      <div className="md:w-[98vw]">
        <div className="flex  flex-col justify-center py-6 xl:p-8 mx-auto  lg:flex-row lg:justify-between bg-gray-800">
          <div className="flex flex-col justify-center py-6  sm:p-6 text-center rounded-sm lg:w-[50%] lg:text-left">
            <h1 className="text-5xl font-bold leading-none py-5 sm:text-6xl">
              play, compete, follow popular streams
            </h1>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, natus.</p>
            </div>
          </div>
          <Link to={`/mike@124/watch/44b35123-9f8e-41d0-bebe-185a4b97f2ce`} className="flex items-center justify-center aspect-video p-6 mt-8 lg:mt-0  sm:h-80 lg:h-96 xl:h-105 2xl:h-112 rounded-xl">
            <video src="" className='border  w-full h-full rounded-xl'></video>
          </Link>
        </div>
        <Carsual link="Top" Stream={liveStream} />
        <Carsual link="Top" Stream={liveStream} />
        <Carsual link="Top" Stream={liveStream} />
        <Carsual link="Top" Stream={liveStream} />
        <Carsual link="Top" Stream={liveStream} />
      </div>
    </Suspense>
  )
}

export default Home;
