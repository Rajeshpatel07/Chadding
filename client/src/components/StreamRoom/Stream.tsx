import React, { useRef } from 'react'
import useViewer from '../../hooks/useViewer'

const Stream: React.FC = () => {

  const { remoteVideoRef, init } = useViewer();
  return (
    <div className='h-dvh w-full flex flex-col items-center '>
      <section className='w-full px-5 flex flex-col items-center rounded-xl'>
        <section className='w-96 h-72 mt-5 '>
          <video
            className="border m-auto w-full h-full rounded-xl "
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
