import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken'
import { User } from "../Interfaces/DBInterfaces.js"
import dotenv from "dotenv";
dotenv.config();

interface payload {
  ID: string | unknown;
}

export const HashPassword = async (Password: string) => {
  return await hash(Password, 10);
}

export const PasswordCompare = async (Password: string, user: User) => {
  if (user && Password) {
    const response = user.Password && await compare(Password, user.Password);
    return response;
  }
  if (!Password || !user) return;
}

export const generateToken = async (user: User) => {
  if (user) {
    const secretKey = process.env.SECRET_KEY || 'defaultSecretKey';
    const payload: payload = { ID: user.Id };
    return await jwt.sign(payload, secretKey);
  }
}
