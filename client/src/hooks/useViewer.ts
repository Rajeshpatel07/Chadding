import { useMemo, useRef, useEffect, useState } from 'react'
import { peerConnection } from '../services/Webrtc'
import axios from 'axios';
import { io } from 'socket.io-client';
import { useAsyncError, useParams } from 'react-router-dom';


const useViewer = () => {
  const socket = useMemo(() => io('http://localhost:5000', { autoConnect: false }), []);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const roomIdInput = useRef<string | null>(null);
const [title,setTitle]=useState<string>('');
const [streamer,setStreamer]=useState<string>('');
  const params = useParams();


  const init = async () => {
    try {
      if (peerConnection.peer) {
        roomIdInput.current = params.streamId;
        peerConnection.peer.addTransceiver("video", { direction: "recvonly" });

        peerConnection.peer.onnegotiationneeded = handleNegotiationNeededEvent;

        peerConnection.peer.ontrack = (event) => {
          console.log(event.streams[0])
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        if (roomIdInput.current) {
          socket.emit("join:viewer", {
            roomId: roomIdInput.current,
            userId: JSON.parse(localStorage.getItem("UserId") || "''")
          })
        } else {
          console.log("roomIdInput is empty")
        }

      } else {
        console.warn("peerConnection is not created");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleNegotiationNeededEvent = async () => {
    try {

      const offer = await peerConnection.createOffer();
      const payload = {
        sdp: offer,
        roomId: roomIdInput.current
      };

      const { data } = await axios.post('/api/viewer', payload);
      console.log(data)
      setTitle(data.Title);
      setStreamer(data.Streamer)
      const desc = new RTCSessionDescription(data.sdp);
      await peerConnection.setAnswer(desc)


    } catch (error) {
      console.log(error)
    }
  }

  return {
    remoteVideoRef,
    init,
    title,
    streamer

  }
}


export default useViewer;
