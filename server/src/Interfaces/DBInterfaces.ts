export interface User {
  Id: string;
  Username?: string | null;
  Email?: string | null;
  Password?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Video {
  Id?: string;
  Title?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
