import React, { useEffect, useState } from 'react';
import Games from '../../Data/Games.json';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { liveStreamsInterface } from '../../services/Interfaces';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface props {
  link: string;
  Stream: Array<liveStreamsInterface>;
}

const Carsual: React.FC<props> = ({ link, Stream }) => {


  return (
    <>
      {
        Stream ?
          <div className='py-8 flex flex-col justify-center gap-2 '>
            <div className='flex justify-between items-center px-8'>
              <h1 className='text-2xl text-white font-serif'>
                <Link to="#" className='text-violet-500'>{link} </Link>
                Streams</h1>
              <button className='px-5 py-2 rounded-full text-white bg-base-200'>view all</button>
            </div>
            <div className=' flex justify-center'>
              <div className="carousel gap-2 w-[94vw] py-10 pl-4">
                {Games.map((item) => (
                  <motion.div
                    key={item.id}
                    className='carousel-item py-2 px-1 w-52 h-44 flex flex-col gap-5 rounded-xl'
                    whileHover={{
                      scale: 1.05,
                      y: -10
                    }}
                  >
                    <Link to={`/${item.streamer_name}/${item.id}`}>
                      <LazyLoadImage src={item.image} alt={item.title} className='rounded-md' />
                    </Link>
                    <div className=' flex flex-col justify-center px-2 gap-2'>
                      <h1 className='text-md text-white'>{item.title}</h1>
                      <section className='flex items-center gap-3'>
                        <div className='bg-red-500 p-4 rounded-full w-4 h-4' style={{ backgroundImage: `url(${item.image})` }}></div>
                        <Link to={item.streamer_name}>{item.streamer_name}</Link>
                      </section>
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

