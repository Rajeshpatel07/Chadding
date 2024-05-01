import React, { useRef } from 'react'
import useStreamer from '../../hooks/useStreamer'


const Video: React.FC = () => {

  const { localVideoRef, getCameraPermission, endStream, startStream, VideoTitle, getDisplayPermission } = useStreamer();

  return (
    <div className='h-dvh w-full flex flex-col items-center '>
      <section className='w-full px-5 flex flex-col items-center rounded-xl'>
        <section className='w-96 h-72 mt-5 '>
          <video
            className="border w-full h-full rounded-xl "
            ref={localVideoRef}
            autoPlay
          />
        </section>
      </section>
      <div className='flex items-center gap-4 mt-5'>
        <input type="text" className='input' ref={VideoTitle} />
        <button className='btn' onClick={getCameraPermission}>getPermission</button>
        <button className='btn' onClick={getDisplayPermission}>share Screen</button>
        <button className='btn' onClick={startStream}>Start stream</button>
        <button className='btn' onClick={endStream}>End Stream</button>
      </div>
    </div>
  )
}

export default Video
