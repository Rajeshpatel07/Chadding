import { Response, Request } from "express";
import { Video } from "../Interfaces/DBInterfaces.js";
import { addVideo, getSingleVideo } from "../services/Video.js"
import webrtc from 'wrtc';
import { send } from "process";

let senderStream: MediaStream;

export const AddVideo = async (req: Request, res: Response) => {
  const { Title, Creator } = req.body;
  if (!Title || !Creator.Id) return res.sendStatus(403).json({ msg: "All files are mandatory" });
  const VideoPath = '23234234-jfeo.mp4';

  try {
    const newVideo: Video = await addVideo(Title, VideoPath, Creator.Id);
    res.json(newVideo);
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }

}
export const GetVideo = async (req: Request, res: Response) => {
  const { Id } = req.params;
  if (!Id) return res.json({ msg: "Invalid video Id" })

  try {
    const video = await getSingleVideo(Id);
    res.json(video)

  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}

export const broadcast = async (req: Request, res: Response) => {
  const body = req.body;
  try {

    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org"
        }
      ]
    });
    peer.ontrack = (e) => handleTrackEvent(e);
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
      sdp: peer.localDescription
    }

    res.json(payload);
  } catch (error) {
    console.log(error)
  }
}

function handleTrackEvent(e) {
  senderStream = e.streams[0];
};

export const viewer = async (req: Request, res: Response) => {
  const body = req.body;
  try {

    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302'
          ]
        }
      ]
    }); const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    if (senderStream) {
      senderStream.getTracks().forEach(track => peer.addTrack(track, senderStream));
    }
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
      sdp: peer.localDescription
    }

    res.json(payload);

  } catch (error) {
    console.log(error)
  }
}

