import { Response, Request } from "express";
import { Video } from "../Interfaces/DBInterfaces.js";
import { addVideo, getSingleVideo } from "../services/Video.js"
import webrtc from 'wrtc';
import { liveStreamsInterface, StreamerId, streamerStreams } from "Interfaces/Interface.js";


export let senderStream:Array<streamerStreams>=[];
export let liveStreams:Array<liveStreamsInterface>=[];

export const AddVideo = async (req: Request, res: Response) => {
  const { Title, Creator } = req.body;

  if (!Title || !Creator || !req.file) {
    return res.sendStatus(403).json({ msg: "All files are mandatory" });
  }

  try {
    // Assuming Multer extracts the path to req.file.path
    const videoPath = req.file?.path;
    const newVideo = await addVideo(Title, videoPath, Creator);
    return res.json(newVideo);
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};


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
    peer.ontrack = (e:RTCTrackEvent) => handleTrackEvent(e,req);
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

function handleTrackEvent(e:RTCTrackEvent,req:Request) {
  senderStream.push({
    userId:req.body.userId,
    MediaStream:e.streams[0]
  })
//   console.log(senderStream)
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
    if (liveStreams) {
        const singleStreamer=liveStreams.find((stream)=>{
            return stream.socketId == body.roomId
          })
      singleStreamer?.MediaStream.getTracks().forEach(track => peer.addTrack(track, singleStreamer?.MediaStream));
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

export const getLiveStreams=(req:Request,res:Response)=>{
    if(liveStreams.length <0){
        return res.json({msg:"No live streams found"});
    }
    return res.json(liveStreams);
}