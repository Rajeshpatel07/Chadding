import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { User } from "../Interfaces/DBInterfaces.js";

const prisma = new PrismaClient;

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
    const hashPassword: string = await hash(Password, 10)
    const newUser: User = await prisma.users.create({
      data: {
        Email,
        Password: hashPassword,
        updatedAt: new Date()
      }
    });
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
    const user = await prisma.users.findFirst({
      where: { Email },
    }) as User;
    if (user?.Password) {
      const comparePassword = await compare(Password, user?.Password);
      if (comparePassword) {
        return res.json({ msg: "Welcome Sir" });
      }
      return res.json({ msg: "Incorrect Password" });
    } else {
      return res.json({ msg: "No User found with this Email" });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed to login" });
  }
}


export {
  Home,
  signup,
  login,
}
