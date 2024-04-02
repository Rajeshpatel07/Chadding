import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Games from '../../Data/Games.json';

interface props {
  link: string;
}

const Carsual: React.FC<props> = ({ link }) => {
  return (
    <div className=' flex flex-col justify-center gap-2 mt-5'>
      <h1 className='text-2xl text-white font-serif'>
        <Link to="#" className='text-violet-500'>{link} </Link>
        Streams</h1>
      <div className=' flex justify-center w-full'>
        <div className="carousel gap-2 py-2 ml-5 w-full flex  ">
          {Games.map((game) => (
            <motion.div
              key={game.id} className='carousel-item py-2 flex flex-col gap-2 rounded-xl'
              whileHover={{
                scale: 1.05,
                y: -10
              }}
            >
              <div className='p-1'>
                <img src={game.image} alt={game.title} className='rounded-xl' />
              </div>
              <div className=' flex items-center px-2 gap-2'>
                <div className='bg-red-500 p-4 rounded-full w-5 h-5' style={{ backgroundImage: `${game.streamer_image}` }}></div>
                <h3>{game.streamer_name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carsual;

