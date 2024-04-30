import React, { Suspense, useEffect } from 'react'
import useViewer from '../../hooks/useViewer'
import Loading from '../Loading/Loading';

const Stream: React.FC = () => {

  const { remoteVideoRef, init } = useViewer();

  useEffect(() => {
    init();
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <div className='h-dvh w-full flex flex-col items-center '>
        <section className='w-full px-5 flex flex-col items-center rounded-xl'>
          <section className='w-96 h-72 mt-5 '>
            <video
              className="border m-auto w-full h-full rounded-xl "
              ref={remoteVideoRef}
              autoPlay
              controls
            />
          </section>
        </section>
      </div>

    </Suspense>
  )
}

export default Stream
