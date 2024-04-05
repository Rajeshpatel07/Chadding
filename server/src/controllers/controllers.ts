import { Response, Request } from "express";
import { User } from "../Interfaces/DBInterfaces.js";
import { HashPassword, PasswordCompare, generateToken } from "../services/Auth.js";
import { CreateUser, findSingleUser } from "../services/User.js"

const Home = (req: Request, res: Response) => {
  res.json({ msg: "This is home Route" });
};

const signup = async (req: Request, res: Response) => {
  const { Email, Password }: User = req.body;
  if (!Email || !Password) {
    res.json({ msg: "All fields are mandatory" })
    return;
  }

  try {
    const userpassword: string = await HashPassword(Password)
    const newUser: User = await CreateUser(Email, userpassword);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed to Signup" });
  }
}

const login = async (req: Request, res: Response) => {
  const { Email, Password }: User = req.body;
  if (!Email || !Password) {
    res.json({ msg: "All fields are mandatory" });
    return;
  }

  try {
    const user = await findSingleUser(Email);
    if (await PasswordCompare(Password, user)) {
      const Token = await generateToken(user);
      res.cookie("Token", Token, { httpOnly: true });
      res.json({ msg: "Welcome Sir" })
    } else {
      return res.json({ msg: "Incorrect Password" })
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed to login" });
  }
}

const Profile = (req: Request, res: Response) => {
  res.send("Welcome");
}


export {
  Home,
  signup,
  login,
  Profile,
}
