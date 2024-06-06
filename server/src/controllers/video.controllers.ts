import { Response, Request } from "express";
import { VideoInterface } from "../Interfaces/DBInterfaces.js";
import { addVideo, getSingleVideo, Videos } from "../services/Video.js"
//@ts-ignore
import webrtc, { MediaStream } from 'wrtc';
import { Viewers, liveStreamsInterface, streamerStreams } from "../Interfaces/Interface.js";
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


export let liveStreams: Array<liveStreamsInterface> = [];
let viewers: Array<Viewers> = [];

export const AddVideo = async (req: Request, res: Response) => {
  const { Title, Id, Image } = req.body;

  if (!Title || !Id || !req.files) {
    return res.status(403).json({ msg: "All fields are mandatory" });
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  try {
    const videoFile = files.video?.[0].filename;
    let imageFile = files.image?.[0].filename;
    if (!imageFile) {
      imageFile = Image;
    }

    if (!videoFile) {
      return res.status(403).json({ msg: "Both video and image files are required" });
    }

    const newVideo = await addVideo(Title, videoFile, imageFile, Id);
    console.log(newVideo);
    return res.json(newVideo);

    // res.json({ message: 'Files uploaded successfully', videoPath, imagePath });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};


export const GetVideo = async (req: Request, res: Response) => {
  const { Id } = req.params;
  if (!Id) return res.json({ msg: "Invalid video Id" })

  try {
    //@ts-ignore
    const dbvideo: VideoInterface = await getSingleVideo(Id);
    const video = {
      videoPath: path.join(import.meta.dirname, '../../Storage/Videos/', dbvideo.videoPath)
    };

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
        'Content-Type': 'video/webm',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      console.log("no range")
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/webm',
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

    //@ts-ignore
    const peer = new webrtc.RTCPeerConnection(Servers);

    let streams: Array<MediaStream> = [];
    peer.ontrack = (e: RTCTrackEvent) => {
      streams.push(e.streams[0]);
    }

    liveStreams.push({
      Id: req.body.Id,
      Title: req.body.title,
      username: req.body.username,
      MediaStream: streams,
      peer: peer
    })
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
      sdp: peer.localDescription
    }

    res.json(payload);

    // peer.close();
    return;
  } catch (error) {
    console.log(error)
  }
}

export const viewer = async (req: Request, res: Response) => {
  const body = req.body;
  console.log("Request for viewer")
  try {
    //@ts-ignore
    const peer = new webrtc.RTCPeerConnection(Servers);
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    let singleStreamer: liveStreamsInterface | undefined;

    if (liveStreams) {
      singleStreamer = liveStreams.find((stream) => {
        return stream.socketId == body.roomId;
      });

      if (!singleStreamer) {
        peer.close();
        return;
      }
      viewers.push({
        Id: body.Id,
        socketId: body.roomId,
        peer: peer
      });
      // console.log("singleStreamer", singleStreamer);
      const combinedStream: MediaStream = new MediaStream(
        [...(singleStreamer?.MediaStream[0]?.getTracks() ?? []),
        ...(singleStreamer?.MediaStream[1]?.getTracks() ?? [])]
      );

      combinedStream.getTracks().forEach((track: RTCTrackEvent) => {
        peer.addTrack(track, combinedStream);
      });
    }

    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
      sdp: peer.localDescription,
      Title: singleStreamer?.Title || '',
      Streamername: singleStreamer?.username || '',
    }

    res.json(payload);
    // peer.close();
    return;

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
    const LiveStreams = liveStreams.map((liveStream) => {
      return {
        Id: liveStream.Id,
        Title: liveStream.Title,
        username: liveStream.username,
        Thumbnail: liveStream.Thumbnail,
        socketId: liveStream.socketId,
      };
    });
    return res.json({ LiveStreams, videos });
  } catch (error) {
    console.log(error)
  }
}

export const endStream = (req: Request, res: Response) => {
  const { Id } = req.body;

  if (!Id) return res.json({ msg: "Id is Undefined" });

  // console.log(liveStreams);
  // Close the peer connections for the streamer
  liveStreams.forEach(stream => {
    if (stream.Id === Id) {
      stream.MediaStream.forEach(mediaStream => {
        mediaStream.getTracks().forEach(track => track.stop());
      });
      stream.peer.close();
      stream.peer = null;
      console.log("Stream peer connection is closed");
    }
  });
  // Filter out the live streams for the streamer
  liveStreams = liveStreams.filter(stream => stream.Id !== Id);
  res.json({ msg: "success", liveStreams });
};

export const stopViewer = (req: Request, res: Response) => {
  const { Id } = req.body;
  console.log("request form stop viewer stream");
  if (!Id) return res.json({ err: "Id is undefined" });

  console.log(viewers);

  viewers.forEach(stream => {
    if (stream.Id === Id) {
      stream.peer.getTracks().forEach(track => track.stop());
      stream.peer.close();
      stream.peer = null;
      return;
    }
  })
  viewers.filter(stream => {
    stream.Id !== Id
  })

  res.json({ msg: "success" });
}
