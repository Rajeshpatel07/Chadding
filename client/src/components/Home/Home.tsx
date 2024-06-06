import React, { lazy, Suspense, useEffect, useState } from 'react';
const Carsual = lazy(() => import('./Carsual'))
import axios from 'axios';
import Loading from '../Extra/Loading';
import { Link } from 'react-router-dom';
import { liveStreamsInterface } from '../../services/Interfaces';
import { v4 as uuid } from 'uuid';

interface Streams {
  LiveStreams: Array<liveStreamsInterface>;
  videos: Array<liveStreamsInterface>;
}

const Home: React.FC = () => {
  const [stream, setStream] = useState<Streams | null>(null)

  useEffect(() => {
    console.log("useEffect run");
    const id = uuid();
    localStorage.setItem("randomId", JSON.stringify(id.slice(0, 8)));
    (async function() {
      try {
        const response = await axios.get("/api/livestreams");
        setStream(response.data);
      } catch (error) {
        console.log(error)
      }
    })()
    return () => {
      console.log("Unmounted");
    }
  }, [])

  if (stream == null) return <Loading />

  console.log("Streams", stream)
  return (
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
        <Link to={`#`} className="flex items-center justify-center aspect-video p-6 mt-8 lg:mt-0  sm:h-80 lg:h-96 xl:h-105 2xl:h-112 rounded-xl">
          <video src="" className='border  w-full h-full rounded-xl'></video>
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        <Carsual link="Top" Stream={stream.LiveStreams} />
        <Carsual link="Recommended" Stream={stream.videos} />
        <Carsual link="Action" Stream={stream.videos} />
      </Suspense>
    </div>
  )
}

export default Home;
