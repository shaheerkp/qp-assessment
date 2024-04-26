import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unathorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { User } from "@prisma/client";

declare module 'express'{
  export interface Request{
      user?:User
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
  } else {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      const user = await prismaClient.user.findFirst({
        where: { id: payload.userId },
      });
      if (!user) {
        next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
      } else {
        req.user = user;
        console.log(user,"******************888")
        next();
      }
    } catch (error) {
      next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
    }
  }
};

export default authMiddleware;
