import React from 'react'
import useRecorder from '../../hooks/useRecorder'
import Chat from './Chat';


const Video: React.FC = () => {

  const { VideoElement, url, startVideo, shareScreen, stopVideo, getPermissions, RecordedVideo } = useRecorder();

  return (
    <div className='h-screen flex items-center justify-center gap-4'>
      <div className='flex gap-3 items-center'>
        <div className='flex flex-col justify-center itmes-center gap-5'>
          <button className='py-2 px-4 rounded-xl bg-blue-500 text-black font-md'
            onClick={getPermissions}
          >Get Permission</button>
          <button className='py-2 px-4 rounded-xl bg-blue-500 text-black font-md'
            onClick={startVideo}
          >start video</button>
          <button className='py-2 px-4 rounded-xl bg-blue-500 text-black font-md'
            onClick={shareScreen}
          >Share Screen</button>
          <button className='py-2 px-4 rounded-xl bg-blue-500 text-black font-md'
            onClick={stopVideo}
          >Stop</button>
        </div>
        <div className='h-56 flex flex-col justify-center gap-6 '>
          <video
            className='w-full h-full border'
            ref={VideoElement}
            autoPlay
          />
          <video
            className='w-full h-full'
            ref={RecordedVideo}
            src={url}
            controls
          />
        </div>
        <Chat />
      </div>
    </div>
  )
}

export default Video
