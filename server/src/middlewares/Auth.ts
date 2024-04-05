import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
config();

export const checkAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const Token = req.cookies;
  const secret_key: string = process.env.SECRET_KEY || 'defaultSecretKey';

  if (!Token) return res.sendStatus(402).json({ msg: "You are not allowed" });

  console.log(Token);
  Jwt.verify(Token, secret_key, (err: Error, decode) => {
    if (err) return res.sendStatus(403)
    console.log(decode)
    next()
  });
};
