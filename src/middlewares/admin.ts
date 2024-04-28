import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unathorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { User } from "@prisma/client";

declare module "express" {
  export interface Request {
    user?: User;
  }
}

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user?.role === "ADMIN") {
    next();
  } else {
    next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

export default adminMiddleware;
