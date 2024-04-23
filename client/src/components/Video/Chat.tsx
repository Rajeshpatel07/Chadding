import React, { useEffect, useRef, useState } from 'react'
import useSocket from '../../hooks/Socket'

const Chat: React.FC = () => {
  const [comment, setComment] = useState("")
  const { othercomments, sendComment } = useSocket()
  const scrollElement = useRef<HTMLDivElement | null>(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.length > 1) {
      sendComment("comment", comment);
      setComment('')
    }
    else {
      console.log("please enter the comment")
    }
  }

  useEffect(() => {
    // Scroll the div to the bottom whenever othercomments changes
    if (scrollElement.current) {
      scrollElement.current.scrollTop = scrollElement.current.scrollHeight;
    }
  }, [othercomments]);

  return (
    <div className='h-full flex flex-col rounded-xl '>
      {/* Live chat */}
      <div className='bg-base-200 h-[13%] '>
        <h1 className='text-3xl font-semibold font-serif text-white mt-5 ml-4'>Live Chat</h1>
      </div>
      {/* chat section */}
      <div className='h-[55.5%]  bg-black overflow-y-auto' ref={scrollElement}>


        {
          othercomments.filter((comment, index) => index % 2 === 0).map(comment => (
            <div key={comment.id} className='flex gap-8 bg-gray-500 py-2 px-5 my-2 rounded-xl'>
              <div>
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                  alt="user"
                  className='w-10 h-10 rounded-full'
                />
              </div>
              <div className='flex flex-col items-start gap-3'>
                <h1 className='text-xl font-medium text-white'>{comment.user}</h1>
                <p className='text-gray-300 w-64'>{comment.comment}</p>
              </div>
            </div>))
        }

      </div>
      {/* message section */}
      <div className=' relative'>
        <textarea placeholder="Enter your message.." style={{ height: "100%" }}
          className="textarea textarea-bordered textarea-md w-full "
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        >
        </textarea>
        <button className=' rounded absolute '
          style={{
            bottom: "24px",
            right: "19px"
          }}
          onClick={handleSubmit}
        >
          <svg width="30px" height="30px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 0H0V48H48V0Z" fill="white" fill-opacity="0.00" />
            <path d="M43 5L29.7 43L22.1 25.9L5 18.3L43 5Z" stroke="#000000" stroke-width="4" stroke-linejoin="round" />
            <path d="M43.0001 5L22.1001 25.9" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

      </div>
    </div>
  )
}

export default Chat



