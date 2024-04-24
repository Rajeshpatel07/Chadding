import React, { useRef } from 'react'
import useStreamer from '../../hooks/useStreamer'


const Video: React.FC = () => {

  const { localVideoRef, getCameraPermission, startStream, getDisplayPermission } = useStreamer();

  return (
    <div className='h-dvh w-full flex flex-col items-center '>
      <section className='w-full px-5 flex flex-col items-center rounded-xl'>
        <section className='w-full mt-5 '>
          <video
            className="border  aspect-video rounded-xl "
            ref={localVideoRef}
            autoPlay
          />
        </section>
      </section>
      <div className='flex items-center gap-4'>
        <button className='btn' onClick={getCameraPermission}>getPermission</button>
        <button className='btn' onClick={getDisplayPermission}>share Screen</button>
        <button className='btn' onClick={startStream}>Start stream</button>
      </div>
    </div>
  )
}

export default Video
