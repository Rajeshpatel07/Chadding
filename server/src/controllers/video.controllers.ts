import { Response, Request } from "express";
import { VideoInterface } from "../Interfaces/DBInterfaces.js";
import { addVideo, getSingleVideo, Videos } from "../services/Video.js"
import webrtc from 'wrtc';
import { liveStreamsInterface, StreamerId, streamerStreams } from "Interfaces/Interface.js";
import fs from 'fs'
import path from "path";

const Servers = {
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

// {
//       url: 'turn:192.158.29.39:3478?transport=udp',
//       username: '28224511:1379330808',
//       credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA='
// },


export let senderStream: Array<streamerStreams> = [];
export let liveStreams: Array<liveStreamsInterface> = [];

export const AddVideo = async (req: Request, res: Response) => {
  const { Title, CreatedBy } = req.body;

  if (!Title || !CreatedBy || !req.file) {
    return res.sendStatus(403).json({ msg: "All files are mandatory" });
  }


  try {
    // Assuming Multer extracts the path to req.file.path
    const videoPath = req.file?.filename;
    const newVideo = await addVideo(Title, videoPath, CreatedBy);
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
    const dbvideo:VideoInterface = await getSingleVideo(Id);
    const video = {
      videoPath: path.join(import.meta.dirname, '../../Storage', dbvideo.videoPath)
    };

    //   console.log('Resolved video path:', video.videoPath);
    //   console.log('Current directory:', process.cwd());

    if (!video) {
      return res.status(404).send('Video not found');
    }

    const stat = fs.statSync(video.videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        res.status(416).send('Requested range not satisfiable');
        return;
      }

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(video.videoPath, { start, end });

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(video.videoPath).pipe(res);
    }
  } catch (error) {
    console.log('Error serving video:', error);
    res.status(500).json({ error: 'An error occurred while trying to serve the video' });
  }
};

export const broadcast = async (req: Request, res: Response) => {
  const body = req.body;
  console.log("request for broadcast");
  try {

    const peer = new webrtc.RTCPeerConnection(Servers);
    peer.ontrack = (e: RTCTrackEvent) => handleTrackEvent(e, req);
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

function handleTrackEvent(e: RTCTrackEvent, req: Request) {
  senderStream.push({
    userId: req.body.userId,
    MediaStream: e.streams[0]
  })
  //   console.log(senderStream)
};

export const viewer = async (req: Request, res: Response) => {
  const body = req.body;
  console.log("Request for viewer")
  try {
    const peer = new webrtc.RTCPeerConnection(Servers);
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    if (liveStreams) {
      const singleStreamer = liveStreams.find((stream) => {
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

export const getLiveStreams = async (req: Request, res: Response) => {
  if (liveStreams.length < 0) {
    return res.json({ msg: "No live streams found" });
  }
  try {
    const videos = await Videos();
    return res.json({ liveStreams, videos });
  } catch (error) {
    console.log(error)
  }
}

export const endStream = (req: Request, res: Response) => {
  const { CreatedBy } = req.body;
  console.log("request to stop Stream", liveStreams);
  liveStreams = liveStreams.filter(stream => {
    stream.streamerId != CreatedBy;
  })
  res.json({ msg: "success", liveStreams })
}
