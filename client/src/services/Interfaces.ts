export interface liveStreamsInterface {
  streamerName: string;
  streamerId: string;
  Thumbnail: string;
  socketId: string;
  Title: string;
  MediaStream: MediaStream;
}

export interface offlineStreamInterface {
  CreatorBy: string;
  Id: string;
  Title: string;
  Thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  videoPath: string;

}

interface IceServer {
  urls: string | string[];
  username?: string;
  credential?: string;
}

export interface Configuration {
  iceServers: IceServer[];
}

export interface fileInput {
  target: {
    files: Array<File>;
  };
}
