import React from 'react';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface stream {
  CreatorBy?: string;
  Id: string;
  Title: string;
  Thumbnail: string;
  socketId?: string;
  username?: string;
  Creator?: {
    Id: string;
    Username: string;
  };
}

interface props {
  link: string;
  Stream: Array<stream>;
}

const Carsual: React.FC<props> = ({ link, Stream }) => {

  // console.log(Stream)
  return (
    <>
      {
        Stream.length >= 1 ?
          <div className='flex flex-col justify-center gap-2 '>
            <div className='flex justify-between items-center px-8'>
              <h1 className='text-2xl text-white font-serif'>
                <Link to="#" className='text-violet-500'>{link} </Link>
                Streams</h1>
              <button className='px-5 py-2 rounded-full text-white bg-base-200'>view all</button>
            </div>
            <div className=' flex justify-center'>
              <div className="carousel gap-2 w-[94vw] py-5 pl-4">
                {Stream.map((item) => (
                  <motion.div
                    key={item.socketId || item.Id}
                    className='carousel-item py-2 px-1 w-52  flex flex-col gap-3 rounded-xl'
                    whileHover={{
                      scale: 1.05,
                      y: -10
                    }}
                  >
                    {
                      item.socketId ?
                        <Link to={`/${item.username || item.Creator?.Username}/l/${item.socketId || item.Id}`} className='w-[207px] h-[116px] bg-cover bg-center relative'>
                          <div className='bg-red-500 text-white px-1 absolute bottom-0 left-0 rounded'>Live</div>
                          <LazyLoadImage src={item.Thumbnail} alt={item.Id} className='rounded-md w-full h-full' />
                        </Link>
                        :
                        <Link to={`/${item.username || item.Creator?.Username}/w/${item.socketId || item.Id}`} className='w-[207px] h-[116px] bg-cover bg-center '>
                          <LazyLoadImage src={item.Thumbnail.includes("http") ? item.Thumbnail : `http://localhost:5000/images/${item.Thumbnail}`} alt={item.Id} className='rounded-md w-full h-full' />
                        </Link>
                    }

                    <div className=' flex flex-col justify-center px-2 gap-2'>
                      <h1 className='text-md text-white'>{item.Title}</h1>
                      <section className='flex items-center gap-3'>
                        <div className='bg-red-500 p-4 rounded-full w-4 h-4' style={{ backgroundImage: `url(${item.Thumbnail})` }}></div>
                        <Link to={`/${item.Id}/home` || `${item.Creator?.Username}/home`}>{item.username || item?.Creator?.Username}</Link>
                      </section>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          :
          <h1 className='text-3xl text-white font-bold my-5'>No Live Streams</h1>
      }
    </>
  );
};

export default Carsual;

