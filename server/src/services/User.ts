import { PrismaClient } from "@prisma/client";
import { User } from "../Interfaces/DBInterfaces.js";

const prisma = new PrismaClient();


export const CreateUser = async (Username: string, Email: string, Password: string) => {
  const newUser: User = await prisma.user.create({
    data: {
      Username,
      Email,
      Password,
      updatedAt: new Date()
    }
  });
  return newUser;
}

export const findSingleUser = async (Email: string) => {
  const user: User = await prisma.user.findFirst({
    where: { Email },
  }) as User;
  return user;
}
