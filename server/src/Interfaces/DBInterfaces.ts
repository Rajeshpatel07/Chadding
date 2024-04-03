export interface User {
  Id: string;
  Email?: string | null;
  Password?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
