import { useRef, useState } from 'react'
import { peerConnection } from '../services/Webrtc'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const socket = new WebSocket('ws://localhost:5000');

const useViewer = () => {
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [title, setTitle] = useState<string>('');
  const params = useParams();
  const path = useRef<boolean>(false);

  const init = async () => {
    try {
      if (peerConnection.peer) {

        peerConnection.peer.addTransceiver("video", { direction: "recvonly" });
        peerConnection.peer.addTransceiver("audio", { direction: "recvonly" });

        peerConnection.peer.onnegotiationneeded = handleNegotiationNeededEvent;

        peerConnection.peer.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };
        peerConnection.peer.onicechange = () => {
          if (peerConnection.iceConnectionState === 'connected') {
            console.log('Peer connection is connected and playing');
          } else if (peerConnection.iceConnectionState === 'failed') {
            console.log('Peer connection failed');
          } else if (peerConnection.iceConnectionState === 'disconnected') {
            console.log('Peer connection disconnected');
          } else {
            console.log('Peer connection is still connecting');
          }
        };

        if (params) {
          const payload = {
            event: "join:viewer",
            roomId: params.streamId,
            Id: JSON.parse(localStorage.getItem("UserId") || "''")
          }
          socket.send(JSON.stringify(payload))
        } else {
          console.log("roomId is empty")
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
      const Id = JSON.parse(localStorage.getItem("UserId")) ?? JSON.parse(localStorage.getItem("randomId"))

      const payload = {
        sdp: offer,
        roomId: params.streamId,
        Id: Id,
      };
      const { data } = await axios.post('/api/viewer', payload);
      setTitle(data.Title);
      if (data.Title.length < 1) {
        path.current = true;
        peerConnection.peer?.close();
        return;
      }
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
    path,
    params,
  }
}


export default useViewer;
