export interface User {
  Id?: string;
  Username?: string | null;
  Email?: string | null;
  Password?: string | null;
  ProfileImage?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VideoInterface {
  Id: string;
  Title: string;
  Creator: string;
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
  CreatedBy: string;
  videoPath: string;
  Thumbnail:string;
}

