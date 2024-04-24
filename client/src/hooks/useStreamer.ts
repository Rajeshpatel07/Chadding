import { useState, useRef } from 'react'
import { peerConnection } from '../services/Webrtc'
import axios from 'axios';


const useStreamer = () => {

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const getCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

    } catch (error) {
      console.error(error);
    }
  };


  const getDisplayPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

    } catch (error) {
      console.error(error);
    }
  };

  const startStream = async () => {
    if (peerConnection.peer) {
      console.log("one")
      peerConnection.peer.onnegotiationneeded = () => handleNegotiationNeededEvent();

      localStream?.getTracks().forEach(track => {
        console.log("localStream tracks", track)
        peerConnection.peer?.addTrack(track, localStream);
      });
    }
  }

  const handleNegotiationNeededEvent = async () => {
    try {
      console.log("two")

      await peerConnection.createOffer();
      const payload = {
        sdp: peerConnection.peer?.localDescription
      };

      const { data } = await axios.post('/api/broadcast', payload);
      const desc = new RTCSessionDescription(data.sdp);
      await peerConnection.setAnswer(desc)

    } catch (error) {
      console.log(error)
    }
  }

  return {
    localVideoRef,
    startStream,
    getCameraPermission,
    getDisplayPermission,
  }
}


export default useStreamer;
