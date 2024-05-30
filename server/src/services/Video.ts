import { prisma } from "../index.js";
import { VideoData } from "Interfaces/DBInterfaces";



// TODO
export const addVideo = async (Title: string, videoPath: string,imagePath: string, creatorId: string) => {
  try {
    const newVideo = await prisma.video.create({
      data: {
        Title: Title,
        CreatedBy: creatorId,
        videoPath: videoPath,
        Thumbnail:imagePath
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
      include:{
        Creator:{
          select: {
            Id: true,
            Username: true,
            Email: true,
            ProfileImage: true
          },
        }
      }
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
    const videos = await prisma.video.findMany({
      include:{
        Creator:{
          select: {
            Id: true,
            Username: true,
            Email: true,
            ProfileImage: true
          },
        }
      }
    })
    return videos;

  } catch (error) {
    console.log(error)
  }
}
