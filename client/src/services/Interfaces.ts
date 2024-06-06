export interface liveStreamsInterface {
  Id: string;
  username: string;
  Title: string;
  Thumbnail: string;
  socketId: string;
}

export interface offlineStreamInterface {
  Id: string;
  Title: string;
  Thumbnail: string;
  CreatorBy: string;
  Creator: {
    Id: string;
    Username: string;
  }

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
