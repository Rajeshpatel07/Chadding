import { useState, useRef } from 'react'
import { peerConnection } from '../services/Webrtc'
import axios from 'axios';


const useViewer = () => {

  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);


  const init = async () => {
    try {
      if (peerConnection.peer) {
        peerConnection.peer.addTransceiver("video", { direction: "recvonly" });

        peerConnection.peer.onnegotiationneeded = handleNegotiationNeededEvent;

        peerConnection.peer.ontrack = (event) => {
          console.log(event.streams[0])
          remoteVideoRef.current.srcObject = event.streams[0];
        };

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
        sdp: offer
      };

      const { data } = await axios.post('/api/viewer', payload);
      console.log(data)
      const desc = new RTCSessionDescription(data.sdp);
      await peerConnection.setAnswer(desc)


    } catch (error) {
      console.log(error)
    }
  }

  return {
    remoteVideoRef,
    init,

  }
}


export default useViewer;
