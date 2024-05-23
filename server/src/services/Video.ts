import { prisma } from "../index.js";
import { VideoInterface, VideoData } from "Interfaces/DBInterfaces";



// TODO
export const addVideo = async (Title: string, VideoPath: string, creatorId: string) => {
  try {
    const newVideo = await prisma.video.create({
      data: {
        Title: Title,
        CreatedBy: creatorId,
        videoPath: VideoPath,
      } as VideoData,
    });
    return newVideo;
  } catch (error) {
    return error;
  }
};


export const getSingleVideo = async (Id: string) => {
  try {
    const video = await prisma.video.findUnique({
      where: {
        Id
      },
    })
    return video;
  } catch (error) {
    return error;
  }
}


export const UserVideos = async (Id: string) => {
  try {
    const videos = await prisma.video.findMany({
      where: {
        CreatedBy: Id
      }
    })
    return videos;

  } catch (error) {
    console.log(error)
  }
}

export const Videos = async () => {
  try {
    const videos = await prisma.video.findMany({})
    return videos;

  } catch (error) {
    console.log(error)
  }
}
