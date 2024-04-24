import React, { useRef } from 'react'
import useViewer from '../../hooks/useViewer'

const Stream: React.FC = () => {

  const { remoteVideoRef, init } = useViewer();
  return (
    <div className='h-dvh w-full flex flex-col items-center '>
      <section className='w-full px-5 flex flex-col items-center rounded-xl'>
        <section className='w-full mt-5 '>
          <video
            className="border m-auto aspect-video rounded-xl "
            ref={remoteVideoRef}
            autoPlay
          />
        </section>
      </section>
      <button className='btn' onClick={init}>start viewing</button>
    </div>

  )
}

export default Stream
