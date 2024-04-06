import { prisma } from "../index.js";
import { Video } from "Interfaces/DBInterfaces";


export const addVideo = async (Title: string, createdBy: string) => {
  const newVideo: Video = await prisma.video.create({
    data: {
      Title,
      createdBy,
      updatedAt: new Date()
    }
  });
  return newVideo;
}
