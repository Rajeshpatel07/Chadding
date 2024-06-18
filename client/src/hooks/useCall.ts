import { useRef, useState } from "react";
import { peerConnection } from "../services/Webrtc";
import axios from "axios";


const useCall = () => {

  const [stream, setStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const getCamera = async () => {
    try {
      const camera = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(camera);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = camera;
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const getDisplay = async () => {
    try {
      const display = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      setStream(display);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = display;
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const start = async () => {
    try {
      if (peerConnection.peer) {
        peerConnection.peer.onnegotiationneeded = () => onnegotiationneededEvent();

        stream?.getTracks().forEach(track => {
          console.log("Tracks", track);
          peerConnection.peer?.addTrack(track, stream);
        });

        peerConnection.peer.ontrack = (e: RTCTrackEvent) => {
          console.log("Incomming", e.streams[0]);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = e.streams[0];
          }
        }

      }
    } catch (error) {
      console.log(error);
    }
  }

  const onnegotiationneededEvent = async () => {
    try {
      const offer = await peerConnection.createOffer();
      const payload = {
        sdp: offer,
        Id: JSON.parse(localStorage.getItem("UserId") || "''"),
        callId: JSON.parse(localStorage.getItem("UserId") || "''"),
      }

      const { data } = await axios.post('/api/createcall', payload);
      console.log(data);
      const desc = new RTCSessionDescription(data.sdp);
      await peerConnection.setAnswer(desc);

    } catch (error) {
      console.log(error);
    }

  }

  return {
    getCamera,
    getDisplay,
    localVideoRef,
    remoteVideoRef,
    start,
  }
}



export default useCall;
