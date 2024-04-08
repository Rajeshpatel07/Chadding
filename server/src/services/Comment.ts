import { prisma } from "../index.js";


export const GetVideoComments=async(Id:string)=>{
    const AllComments=await prisma.comment.findMany({
        where:{
            videoId:Id
        }
    })
    return AllComments;
}

export const AddVideoComment=async(comment:string,VideoId:string,CreatedBy:string)=>{
    const Response=await prisma.comment.create({
        data:{
            comment,
            videoId:VideoId,
            CreatedBy
        }
    })
    return Response;
}