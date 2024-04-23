import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

interface commentInterface {
  id: string;
  user: string;
  comment: string;
}

const socket = io("http://localhost:5000");

const useSocket = () => {

  const [othercomments, setOtherComments] = useState<Array<commentInterface>>([]);

  const incommingEvent = () => {
    socket.on("message", (comments) => {
      setOtherComments(prevComments => [...prevComments, { ...comments }]);
    });
  }


  useEffect(() => {
    incommingEvent();
  }, []);


  const sendComment = (event: string, comment: string) => {
    const user = JSON.parse(localStorage.getItem("Username"));
    const id = Date.now()
    socket.emit(event, { id: id, user: user, comment })
  }

  return {
    othercomments,
    sendComment,
  }
}

export default useSocket;
