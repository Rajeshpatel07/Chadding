import { prisma } from "../index.js";
import { User } from "../Interfaces/DBInterfaces.js";


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

export const getSingleUser = async (username: string) => {
  const user: User = await prisma.user.findUnique({
    where: {
      Username: username
    }
  }) as User;

  return user;
}

