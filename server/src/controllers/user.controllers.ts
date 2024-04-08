import { Request, Response } from "express";
import { getSingleUser } from "../services/User.js"
import { UserVideos } from "../services/Video.js";

export const getUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  if (!username) return res.json({ msg: "Invalid Username" })

  try {
    const User = await getSingleUser(username);
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
