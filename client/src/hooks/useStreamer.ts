import { useState, useRef } from 'react'
import { peerConnection } from '../services/Webrtc'
import axios from 'axios';
import { io } from 'socket.io-client';
import { base64, isBase64 } from '../services/Base64';

export const socket = io('http://localhost:5000', {
  transports: ['websocket']
});

const useStreamer = () => {

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [check, setCheck] = useState<boolean>(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Array<Blob>>([]);
  const VideoTitle = useRef<HTMLInputElement | null>(null);
  const Imageurl = useRef<string | null>(null);

  const getCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      } else {
        console.log("localVideoRef is undefined")
      }
    } catch (error) {
      console.error(error);
    }
  };



  const getDisplayPermission = async () => {
    try {
      //Getting the userMedia
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
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
        peerConnection.peer.onnegotiationneeded = () => handleNegotiationNeededEvent();
        //pushing the localstream to the peerConnection
        localStream?.getTracks().forEach(track => {
          peerConnection.peer?.addTrack(track, localStream);
        });
      }
      //Recording the Stream
      if (localStream && check) {
        recordMedia(localStream)
      }
      // socket.connect();

    } catch (error) {
      console.log(error)
    }
  };

  const handleNegotiationNeededEvent = async () => {
    try {

      await peerConnection.createOffer();
      const payload = {
        sdp: peerConnection.peer?.localDescription,
        Id: JSON.parse(localStorage.getItem('UserId') || '""'),
        username: JSON.parse(localStorage.getItem('Username') || '""'),
        title: VideoTitle.current?.value
      };

      const { data } = await axios.post('/api/broadcast', payload);
      const desc = new RTCSessionDescription(data.sdp);
      await peerConnection.setAnswer(desc)
      socket.emit("join:streamer", {
        Id: JSON.parse(localStorage.getItem("UserId") || '""'),
        thumbnail: Imageurl.current,

      });

    } catch (error) {
      console.log(error)
    }
  }

  const endStream = async () => {
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      })

      peerConnection.peer?.close();
      if (check) {
        mediaRecorder.current?.stop();
      }
      socket.emit("disconnection");
      socket.disconnect();
      try {
        const response = await axios.post("/api/stopstream", {
          Id: JSON.parse(localStorage.getItem("UserId") || '""')
        })
        console.log(response);
      } catch (error) {
        console.log(error)
      }

    }
  }

  const recordMedia = (stream: MediaStream) => {
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.onstart = () => {
      console.log("MediaRecorder started recording");
      if (mediaRecorder.current) {
        if (check) {
          mediaRecorder.current.ondataavailable = async (event) => {
            chunks.current.push(event.data);
            const superbuffer = new Blob(chunks.current);

            try {
              const formData = new FormData();
              formData.append('video', superbuffer, `${VideoTitle.current?.value}.webm`); // Change 'video' to 'files'
              if (Imageurl.current) {
                if (isBase64(Imageurl.current)) {
                  const imageBlob = base64(Imageurl.current);
                  formData.append('image', imageBlob, `${VideoTitle.current?.value}.jpg`)
                }
                formData.append('Image', Imageurl.current);
              }
              formData.append('Title', VideoTitle.current?.value || '');
              formData.append('Id', JSON.parse(localStorage.getItem('UserId') || '""'));
              const response = await axios.post('/api/video', formData);
              console.log(response);
            } catch (error) {
              console.log(error);
            }
          };
        }
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
    setCheck,
    check,
    Imageurl
  }
}


export default useStreamer;
