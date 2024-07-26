import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: number,
    name: string,
    email: string
}

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            userId: number,
            name: string,
            email: string
        };
    }
  }

export const userJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    const payload = jwt.verify(token, secretKey) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

export const adminJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const secretKey = process.env.JWT_SECRET_KEY_ADMIN as string;
    const payload = jwt.verify(token, secretKey) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
