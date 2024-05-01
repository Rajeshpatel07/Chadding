
import { Configuration } from "./Interfaces";

const configuration: Configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302'
      ]
    },
    {
      urls: 'turn:openrelay.metered.ca:80',
      username: 'openrelayproject',
      credential: 'openrelayproject'
  }
  ]
}

class Peer {
  peer: RTCPeerConnection | null;

  constructor() {
    this.peer = new RTCPeerConnection(configuration);
  }




  async createOffer(): Promise<RTCSessionDescriptionInit | null> {
    try {
      if (this.peer) {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(offer);
        return offer;
      } else {
        console.error('Peer connection is not initialized.');
        return null;
      }
    } catch (error) {
      console.error('Error creating offer:', error);
      return null;
    }
  }


  async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | null> {
    try {
      if (this.peer) {
        await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(answer);
        return answer;
      } else {
        console.error('Peer connection is not initialized.');
        return null;
      }
    } catch (error) {
      console.error('Error getting answer:', error);
      return null;
    }
  }

  async setAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
    try {
      if (this.peer) {
        await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
      } else {
        console.error('Peer connection is not initialized.');
      }
    } catch (error) {
      console.error('Error setting answer:', error);
    }
  }
}
export const peerConnection = new Peer();
