import React from 'react'
import useCall from '../../hooks/useCall';

const Call: React.FC = () => {

	const { getCamera, getDisplay, start, localVideoRef, remoteVideoRef } = useCall();

	return (
		<div className='flex mt-8 '>
			<div className='flex flex-col items-center '>
				<video ref={localVideoRef} autoPlay className='w-96 h-52 bg-black' />
				<div className='flex gap-5'>
					<button onClick={getCamera} className='btn'>camera</button>
					<button onClick={getDisplay} className='btn'>Display</button>
					<button onClick={start} className='btn'>Start</button>
				</div>

			</div>
			<video ref={remoteVideoRef} autoPlay className=' ml-5 w-96 h-52 bg-black' />
		</div>
	)
}

export default Call;
