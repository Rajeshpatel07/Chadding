import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import comment from '../../Data/comment.json'
import { socket } from '../../hooks/useStreamer';
import { useParams } from 'react-router-dom';
import Loading from '../Extra/Loading';

const Chat: React.FC = () => {
  const [socketId, setSocketId] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { streamId } = useParams();

  const handleComment = (e: FormEvent) => {
    e.preventDefault();
    const username = JSON.parse(localStorage.getItem("Username") || "''") || JSON.parse(localStorage.getItem("randomId") || "''")
    if (!inputRef.current?.value) return;
    const payload = {
      event: "comment",
      roomId: socketId,
      comment: inputRef.current?.value,
      username: username
    };

    console.log("websocket is open")
    socket.send(JSON.stringify(payload));

    inputRef.current.value = '';
  }

  useEffect(() => {
    if (streamId) setSocketId(streamId);
    socket.onmessage = (event) => {
      const data = event.data.toString();
      const message = JSON.parse(data);
      if (message.type == "me") {
        setSocketId(message.socketId);
      }
    };
    const payload = {
      event: "join:viewer",
      roomId: socketId
    }
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    }
  }, [socketId, streamId]);

  if (socketId.length < 1) return <Loading />

  return (
    <>
      <div className='mt-5 md:mt-0 h-64  md:h-46 relative flex flex-col  p-6 border'>
        <div className='h-[95%] overflow-y-auto py-5' >
          <Message />
        </div>
        <form className='flex items-center relative bg-gray-700 rounded-xl' onSubmit={handleComment}>
          <input type="text" placeholder='Comment' ref={inputRef} className='w-full py-3 outline-none rounded-xl bg-transparent' />
          <button className=' absolute right-2'>
            <img src="https://img.icons8.com/?size=256&id=85971&format=png" alt="send" className='w-7 h-7 text-white' />
          </button>
        </form>
      </div>
    </>
  )
}

export default Chat

interface comment {
  username: string;
  comment: string;
}

const Message: React.FC = () => {
  const [comments, setComments] = useState<Array<comment>>([]);
  const scrollElement = useRef<HTMLDivElement | null>(null);

  const handleNewComment = useCallback((data: comment) => {
    setComments((prevComments) => [...prevComments, data]);
  }, [setComments]);

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = event.data.toString();
      const message = JSON.parse(data);
      if (message.type === "comment") {
        handleNewComment(message);
      }
    }

    if (scrollElement.current) {
      scrollElement.current.scrollTop = scrollElement.current.scrollHeight;
    }
  }, [handleNewComment]);

  return (
    <div ref={scrollElement}>
      {comments.map((comment, index) => (
        <section key={index} className='flex items-center gap-3 py-2'>
          <div className='flex gap-3 items-center'>
            <h1 className='text-lg text-white font-medium'>{comment.username}</h1>
            <p className=''>{comment.comment}</p>
          </div>
        </section>
      ))}
    </div>
  );
};


