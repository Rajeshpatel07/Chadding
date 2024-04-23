import { Response, Request } from "express";
import { User } from "../Interfaces/DBInterfaces.js";
import { HashPassword, PasswordCompare, generateToken } from "../services/Auth.js";
import { CreateUser, findSingleUser, getSingleUser } from "../services/User.js"
import { UserVideos } from "../services/Video.js";

const Home = (req: Request, res: Response) => {
  res.json({ msg: "This is home Route" });
};

const signup = async (req: Request, res: Response) => {
  const { Username, Email, Password }: User = req.body;
  if (!Username || !Email || !Password) {
    res.json({ msg: "All fields are mandatory" })
    return;
  }
  const ProfileImage: string = "33234234-image.png";

  try {
    const userpassword: string = await HashPassword(Password)
    const newUser: User = await CreateUser(Username, Email, userpassword, ProfileImage);
    res.json({ msg: "SignUp successful" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed to Signup" });
  }
}

const login = async (req: Request, res: Response) => {
  const { Email, Password }: User = req.body;
  if (!Email || !Password) {
    return res.json({ msg: "All fields are mandatory" });
  }

  try {
    const user = await findSingleUser(Email);
    if (await PasswordCompare(Password, user)) {
      const Token = await generateToken(user);
      res.cookie("Token", Token);
      return res.json({ userId: user.Id, username: user.Username })
    } else {
      return res.json({ error: "Incorrect Password" })
    }
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Failed to login" });
  }
}

const Profile = async (req: Request, res: Response) => {
  const { Id } = req.params;
  if (!Id) return res.status(401).json({ error: "User not found" });

  try {
    const user = await getSingleUser(Id);
    const videos = await UserVideos(Id);
    delete user.Password;
    delete user.Email;
    return res.status(200).json({
      User: user,
      videos: videos
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export {
  Home,
  signup,
  login,
  Profile,
}
