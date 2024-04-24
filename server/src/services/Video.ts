import { prisma } from "../index.js";
import { Video,VideoData } from "Interfaces/DBInterfaces";



// TODO
export const addVideo = async (Title: string, VideoPath: string, creatorId: string) => {
  const newVideo = await prisma.video.create({
    data: {
      Title,
      Creator: {
        connect: {
          Id: creatorId,
        },
      },
      videoPath: VideoPath,
      // Removed manual updateAt setting
    } as VideoData,
  });
  return newVideo;
};


export const getSingleVideo = async (Id: string) => {
  const video = await prisma.video.findUnique({
    where: {
      Id
    },
  })
  return video;
}


export const UserVideos = async (Id: string) => {
  const videos = await prisma.video.findMany({
    where: {
      CreatedBy: Id
    }
  })
  return videos;
}

