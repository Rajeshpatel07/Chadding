import { Response, Request } from "express";
import { Video } from "../Interfaces/DBInterfaces.js";
import { addVideo, getSingleVideo } from "../services/Video.js"


export const AddVideo = async (req: Request, res: Response) => {
  const { Title, Creator } = req.body;
  if (!Title || !Creator.Id) return res.sendStatus(403).json({ msg: "All files are mandatory" });

  try {
    const newVideo: Video = await addVideo(Title, Creator.Id);
    res.json(newVideo);
  } catch (error) {
    console.log(error);
    res.json({ error:error });
  }

}
export const GetVideo= async (req:Request,res:Response)=>{
  const {Id}=req.params;
  if(!Id) return res.json({msg:"Invalid video Id"})

  try{
    const video=await getSingleVideo(Id);
    res.json(video)
    
  }catch(error){
    console.log(error);
    res.json({error:error});
  }
}

