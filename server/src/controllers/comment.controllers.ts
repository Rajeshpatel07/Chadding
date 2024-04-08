import { Request, Response } from "express";
import { GetVideoComments,AddVideoComment } from "../services/Comment.js";

export const getComments=async(req:Request,res:Response)=>{
    const {Id}=req.params;
    if(!Id) return res.sendStatus(404).json({error:"Invalid Video Id"});

    try{
        const comments=await GetVideoComments(Id);
        res.json(comments)
    }catch(error){
        console.log(error)
        res.json(error)
    }
}

export const AddComment=async(req:Request,res:Response)=>{
    const {comment,VideoId,CreatedBy}=req.body;
    if(!comment || !VideoId || !CreatedBy) return res.sendStatus(402).json({error:"All fields are mandatory"});

    try {
        const Comment=await AddVideoComment(comment,VideoId,CreatedBy);
        res.json(Comment)
    } catch (error) {
     console.log(error)   
     res.json(error)
    }
}