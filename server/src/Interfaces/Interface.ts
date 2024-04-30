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
  MediaStream: MediaStream;
  socketId?: string;
}

export interface liveStreamsInterface {
  streamerName: string;
  streamerId: string;
  Thumbnail: string;
  socketId: string;
  MediaStream: MediaStream;
}
