export interface User {
  Id?: string;
  Username?: string | null;
  Email?: string | null;
  Password?: string | null;
  ProfileImage?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface User {
  Id: string;
}

export interface Video {
  Id: string;
  Title: string;
  Creator: User;
  videoPath: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface userUpdate {
  Id: string;
  Username?: string;
  ProfileImage?: string;
}

export interface VideoData {
  Title: string;
  Creator: {
    connect: {
      Id: string;
    }
  }
  videoPath: string;
  updatedAt: Date;
}
