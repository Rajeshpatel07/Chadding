import React from 'react'
import useRecorder from '../../hooks/useRecorder';


const Video: React.FC = () => {

  const { localVideo, remoteVideo, StartStream, GetPermission, endCall, room, setRoom } = useRecorder();

  return (
    <div className='h-screen flex items-center justify-center gap-4 '>
      <div className='flex-col gap-3 justify-center sm:flex '>
        <div className='flex justify-center gap-6'>
          <div className="w-72 h-40 border">
            <video
              className='w-full h-full'
              ref={localVideo}
              autoPlay
            />
          </div>
          <div className="w-72 h-40 border">
            <video
              className='w-full h-full'
              ref={remoteVideo}
              autoPlay
            />
          </div>
        </div>
        <div className=' mt-5 flex flex-col justify-center itmes-center gap-5'>
          <button className='py-2 px-4 rounded-xl bg-blue-500 text-black font-md'
            onClick={GetPermission}
          >Permission</button>
          <button className='py-2 px-4 rounded-xl bg-blue-500 text-black font-md'
            onClick={StartStream}
          >start video</button>
          <button className='py-2 px-4 rounded-xl bg-blue-500 text-black font-md'
            onClick={endCall}
          >End Call</button>
        </div>
      </div >
    </div >
  )
}

export default Video
