import { prisma } from "../index.js";
import { User,userUpdate } from "../Interfaces/DBInterfaces.js";


export const CreateUser = async (Username: string, Email: string, Password: string,ProfileImage:string) => {
  const newUser: User = await prisma.user.create({
    data: {
      Username,
      Email,
      Password,
      ProfileImage,
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


export const updateUser=async(body:userUpdate,file:object)=>{
  const newUser=await prisma.user.update({
    where:{
      Id:body.Id
    },
    data:{
      Username:body.Username,
      ProfileImage:file.path
    }
  })
}