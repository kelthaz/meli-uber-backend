import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    requestId?: string;
  }
}

export const addRequestId = (req: Request, res: Response, next: NextFunction) => {
  req.requestId = uuidv4();
  next();
};
