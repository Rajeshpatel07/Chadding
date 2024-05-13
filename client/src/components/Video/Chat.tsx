import React, { useEffect, useRef, useState } from 'react'
import comment from '../../Data/comment.json'

const Chat: React.FC = () => {

  return (
    <>
      <div className='mt-5 md:mt-0 h-64  md:h-46 relative flex flex-col  p-6 border'>
        <div className='h-[95%] overflow-y-auto py-5'>
          <Message />
        </div>
        <div className='flex items-center relative bg-gray-700 rounded-xl'>
          <input type="text" placeholder='Comment' className='w-full py-3 outline-none rounded-xl bg-transparent' />
          <button className=' absolute right-2'>
            <img src="https://img.icons8.com/?size=256&id=85971&format=png" alt="send" className='w-7 h-7 text-white' />
          </button>
        </div>
      </div>
    </>
  )
}

export default Chat


const Message: React.FC = () => {

  return (
    <>
      {
        comment.map(item => (
          <section key={item.comment} className='flex items-center gap-3 py-2'>
            <div className='w-10 h-10 self-start'>
              <img src="/favicon.png" alt="img" className='w-full h-full bg-cover bg-center' />
            </div>
            <div className='flex flex-col justify-center'>
              <h1 className='text-lg text-white font-medium'>Mike</h1>
              <p className=''>{item.comment}</p>
            </div>
          </section>
        ))
      }
    </>
  )
}


