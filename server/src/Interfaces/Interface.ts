export interface StreamerId {
  createdBy: string;
  roomId: string;
}

export interface ViewerId {
  userId: string;
  roomId: string;
}

export interface streamerStreams {
  userId: string;
  MediaStream: Array<MediaStream>;
  peer: RTCPeerConnection;
}

export interface liveStreamsInterface {
  Id: string;
  Title: string;
  username: string;
  Thumbnail: string;
  socketId?: string;
  MediaStream: Array<MediaStream>;
  peer: RTCPeerConnection;
}
