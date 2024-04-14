import { Request, Response } from "express";
import { getSingleUser } from "../services/User.js"
import { UserVideos } from "../services/Video.js";

export const getUser = async (req: Request, res: Response) => {
  const { Id } = req.params;
  if (!Id) return res.json({ msg: "UserId not found" })

  try {
    const User = await getSingleUser(Id);
    console.log(Id)
    res.json(User)
  } catch (error) {
    console.log(error);
    res.json(error)
  }
}

export const getUserVideos = async (req: Request, res: Response) => {
  const { Id } = req.params;
  if (!Id) return res.json({ msg: "Invalid User Id" })

  try {
    const Videos = await UserVideos(Id);
    res.json(Videos)
  } catch (error) {
    console.log(error);
    res.json(error)
  }
}

export const UpdateProfile = async (req: Request, res: Response) => {
  const body = req.body;
  const file = req.file;
  if (!body) return res.json({ error: "fields are mandatory" })

  try {

  } catch (error) {
    console.log(error);
    res.json(error)
  }
}
