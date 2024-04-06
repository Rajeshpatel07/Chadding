export interface User {
  Id: string;
  Username?: string | null;
  Email?: string | null;
  Password?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
