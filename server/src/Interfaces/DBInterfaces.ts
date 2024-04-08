export interface User {
  Id: string;
  Username?: string | null;
  Email?: string | null;
  Password?: string | null;
  ProfileImage?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Video {
  Id?: string;
  Title?: string;
  Creator?: {
    Id?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface userUpdate{
  Id:string;
  Username?:string;
  ProfileImage?:string;
}
