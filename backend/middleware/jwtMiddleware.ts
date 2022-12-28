import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export function JWTMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization?.toLowerCase().includes('bearer ')
    ) {
      throw new Error();
    }

    const auth = req.headers.authorization?.split(' ');
    const decoded: any = jwt.verify(auth[1], process.env.JWT_KEY);
    //adding email to request body
    req.body.author_email = decoded.email;
    next();
  } catch (error) {
    throw new HttpException(
      { error: true, message: 'You are not authorized for this action' },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
