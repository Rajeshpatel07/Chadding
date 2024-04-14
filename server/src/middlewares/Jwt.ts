
import Jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
config();

interface decode {
  ID: string;
  iat: number;
}

export const checkAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const { Token } = req.cookies;
  const secret_key: string = process.env.SECRET_KEY || 'defaultSecretKey';

  if (!Token) return res.sendStatus(401).json({ msg: "You are not allowed" });

  Jwt.verify(Token, secret_key, (err: VerifyErrors | null, decode: decode | null) => {
    if (err) return res.sendStatus(401);
    console.log(decode);
    next();
  });
};

