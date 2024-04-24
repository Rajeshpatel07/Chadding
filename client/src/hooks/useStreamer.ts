import { useState, useRef } from 'react'
import { peerConnection } from '../services/Webrtc'
import axios from 'axios';


const useStreamer = () => {

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Array<Blob>>([]);
  const VideoTitle = useRef<HTMLInputElement | null>(null);

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
    try {
      if (peerConnection.peer) {
        console.log("one")
        peerConnection.peer.onnegotiationneeded = () => handleNegotiationNeededEvent();

        localStream?.getTracks().forEach(track => {
          console.log("localStream tracks", track)
          peerConnection.peer?.addTrack(track, localStream);
        });
      }
      recordMedia(localStream)
    } catch (error) {
      console.log(error)
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

  const endStream = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      })
      mediaRecorder.current?.stop();
      peerConnection.peer?.close();
    }
  }

  const recordMedia = (stream: MediaStream) => {
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.onstart = () => {
      console.log("MediaRecorder started recording");
      if (mediaRecorder.current) {

        mediaRecorder.current.ondataavailable = async (event) => {
          chunks.current.push(event.data);
          const superbuffer = new Blob(chunks.current);

          try {
            const formData = new FormData();
            formData.append('video', superbuffer, 'test.mp4');
            formData.append("Title", VideoTitle.current?.value);
            formData.append("Creator", JSON.parse(localStorage.getItem('UserId')))
            const response = await axios.post('/api/video', formData);
            console.log(response)
          } catch (error) {
            console.log(error);
          }
        };
      }
    };

    mediaRecorder.current.start()
  }

  return {
    localVideoRef,
    startStream,
    getCameraPermission,
    getDisplayPermission,
    endStream,
    VideoTitle,
  }
}


export default useStreamer;
