import React from 'react'
import useRecorder from '../../hooks/useRecorder'


const Video: React.FC = () => {

  const { VideoElement, url, startVideo, shareScreen, stopVideo, getPermissions, RecordedVideo } = useRecorder();

  return (
    <div className='h-[80vh] flex flex-col items-center justify-center gap-4'>
      <div className='h-96 flex gap-6 bg-red-500'>
        <video
          className='w-full h-full'
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
      <div className='flex itmes-center gap-5'>
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
    </div>
  )
}

export default Video
