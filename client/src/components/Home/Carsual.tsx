import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Games from '../../Data/Games.json';
import { liveStreamsInterface } from '../../services/Interfaces';

interface props {
  link: string;
  Stream: Array<liveStreamsInterface>;
}

const Carsual: React.FC<props> = ({ link, Stream }) => {
  const [width, setWidth] = useState(window.innerWidth > 768 ? '100%' : window.innerWidth > 640 ? '38rem' : '25rem');

  const handleResize = () => {
    setWidth(window.innerWidth > 768 ? '100%' : window.innerWidth > 640 ? '38rem' : '25rem');
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {
        Stream.length > 0 ?
          <div className=' flex flex-col justify-center gap-2 '>
            <h1 className='text-2xl text-white font-serif'>
              <Link to="#" className='text-violet-500'>{link} </Link>
              Streams</h1>
            <div className=' flex justify-center' style={{ width }}>
              <div className="carousel gap-2 w-inherit py-2 pl-4" style={{ width: "inherit" }}>
                {Stream.map((item) => (
                  <motion.div
                    key={item.streamerId} className='carousel-item py-2 px-1 flex flex-col gap-10 rounded-xl'
                    whileHover={{
                      scale: 1.05,
                      y: -10
                    }}
                  >
                    <Link to={`/${item.streamerName}/${item.socketId}`}>
                      <img src={item.Thumbnail} alt={item.socketId} className='rounded-md' />
                    </Link>
                    <div className=' flex items-center px-2 gap-2'>
                      <div className='bg-red-500 p-4 rounded-full w-5 h-5'></div>
                      <Link to={item.streamerName}>{item.streamerName}</Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          :
          <h1 className='text-3xl text-white font-bold my-5'>No Live Streams found</h1>
      }
    </>
  );
};

export default Carsual;

