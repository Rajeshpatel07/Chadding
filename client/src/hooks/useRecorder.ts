import { useState, useRef, useEffect } from "react";
import { SocketOptions, io } from 'socket.io-client'

const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302'
      ]
    }
  ]
}

const socket = io("http://localhost:5000", {
  autoConnect: false
});

const useRecorder = () => {

  const [localstream, setLocalstream] = useState<MediaStream | null>(null);
  const localVideo = useRef<HTMLVideoElement | null>(null);
  const remoteVideo = useRef<HTMLVideoElement | null>(null);
  const remoteStream = useRef<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [room, setRoom] = useState<string>("");



  useEffect(() => {
    socket.on("Offer", async (data) => {
      try {
        await peerConnection.current?.setRemoteDescription(data.offer);
        const answer = await peerConnection.current?.createAnswer();
        await peerConnection.current?.setLocalDescription(answer);
        console.log("answer created ", answer);
        console.log("localdescripion in offer event", peerConnection.current?.localDescription);
        console.log("signalstate after the answer is setted as localdescripion ", peerConnection.current?.signalingState);
        socket.emit("Answer", { answer: answer });
      } catch (error) {
        console.error("Error setting local answer:", error);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("Answer", async (data) => {

      try {
        const signalstate = peerConnection.current?.signalingState;
        console.log("signalstate  in answer event", signalstate)

        await peerConnection.current?.setRemoteDescription(data.answer)
        console.log("Remote description in answer", peerConnection.current?.remoteDescription)
      } catch (error) {
        console.log(error)
      }
    })
  }, [])

  useEffect(() => {
    socket.on("iceCandidate", async (data) => {
      await peerConnection.current?.addIceCandidate(data.candidate);
    })
  }, [])

  const GetPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      if (localVideo.current) localVideo.current.srcObject = stream;
      setLocalstream(stream);
      peerConnection.current = new RTCPeerConnection(configuration);
      socket.connect();
    } catch (error) {
      console.log(error)
    }
  }

  const StartStream = async () => {

    if (peerConnection.current === null) {
      console.log("peerConnection is not initialized")
    }

    // if (remoteStream && localstream) {
    //   remoteStream.current = new MediaStream(localstream);
    // }

    localstream?.getTracks().forEach(track => {
      if (peerConnection.current) {
        peerConnection.current.addTrack(track, localstream);
      }
    })

    peerConnection.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => {
        console.log("Remote Tracks", track)
        remoteStream.current?.addTrack(track);
      })
    }

    if (remoteStream.current) {
      remoteVideo.current.srcObject = remoteStream.current;
    }

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("iceCandidate", { candidate: event.candidate });
      }
    }


    try {
      const signalstate = peerConnection.current?.signalingState;
      console.log("signalstate on creating Offer", signalstate)

      let offer = await peerConnection.current?.createOffer();
      await peerConnection.current?.setLocalDescription(offer);
      console.log("localDescription after creating offer", peerConnection.current?.localDescription)
      socket.emit('Offer', { offer: offer });

    } catch (error) {
      console.error("Error setting local description:", error);
    }
  }


  const endCall = () => {
    console.log("clicked")
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    if (localVideo.current) {
      localVideo.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    if (remoteVideo.current) {
      remoteVideo.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    socket.disconnect()
  }




  return {
    localVideo,
    remoteVideo,
    StartStream,
    GetPermission,
    peerConnection,
    socket,
    endCall,
    room,
    setRoom,
  }
}

export default useRecorder;

