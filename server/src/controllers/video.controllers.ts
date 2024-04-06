import { Response, Request } from "express";
import { Video } from "../Interfaces/DBInterfaces.js";
import { addVideo } from "../services/Video.js"


export const AddVideo = async (req: Request, res: Response) => {
  const { Title, createdBy } = req.body;
  if (!Title || !createdBy) return res.sendStatus(403).json({ msg: "All files are mandatory" });

  try {
    const newVideo: Video = await addVideo(Title, createdBy);
    res.json(newVideo);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed to Signup" });
  }

}

