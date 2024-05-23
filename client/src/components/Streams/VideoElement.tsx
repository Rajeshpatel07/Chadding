import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Recomended from '../Extra/Recomended';
import Profile from '../Profile/Profile';

const VideoElement: React.FC = () => {

  const videoRef=useRef<HTMLVideoElement | null>(null);
  const params=useParams();

  return (
    <div className="w-[100vw] md:w-[96vw] h-auto">
      <div className="flex flex-col justify-center  py-4 xl:py-6 mx-auto bg-gray-800">
        <section className='flex flex-col justify-center gap-3 md:flex-row box-border'>
          <div className='flex flex-col justify-start md:w-[73%]'>
            <div className="flex flex-col gap-3 justify-center w-full" >
              <video className='w-full h-64 md:h-46  bg-black' autoPlay controls ref={videoRef} >
                <source src={`http://localhost:5000/api/video/${params.videoId}`} type='video/mp4'/>
              </video>
              <div className='flex justify-between items-center  flex-wrap px-5'>
                <h1 className='text-3xl text-white font-serif'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                <div className='flex items-center gap-3'>
                  <button className='p-2 bg-gray-700 rounded-full border  flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z" />
                    </svg>
                  </button>
                  <button className='p-2 bg-gray-700 rounded-full border flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M5 14h-5v-12h5v12zm18.875-4.809c0-.646-.555-1.32-1.688-1.41-.695-.055-.868-.623-.031-.812.701-.159 1.098-.652 1.098-1.181 0-.629-.559-1.309-1.826-1.543-.766-.141-.842-.891-.031-.953.688-.053.96-.291.96-.626-.001-.931-1.654-2.666-4.852-2.666-4.16 0-6.123 2.067-10.505 2.768v10.878c2.375.869 4.466 2.644 5.688 6.886.478 1.661.781 3.468 2.374 3.468 2.375 0 2.594-5.125 1.688-8.781 1.312-.688 3.751-.936 4.979-.885 1.771.072 2.271-.818 2.271-1.49 0-1.011-.833-1.35-1.354-1.51-.609-.188-.889-.807-.031-.922.836-.112 1.26-.656 1.26-1.221z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <Profile />
          </div>
          <div className='w-full md:w-[24%]   '>
            <Recomended />
          </div>
        </section>
      </div>
    </div>)
}

export default VideoElement;
