import { PrismaClient } from "@prisma/client";
import { User } from "../Interfaces/DBInterfaces.js";

const prisma = new PrismaClient();


export const CreateUser = async (Email: string, Password: string) => {
  const newUser: User = await prisma.users.create({
    data: {
      Email,
      Password,
      updatedAt: new Date()
    }
  });
  return newUser;
}

export const findSingleUser = async (Email: string) => {
  const user: User = await prisma.users.findFirst({
    where: { Email },
  }) as User;
  return user;
}
