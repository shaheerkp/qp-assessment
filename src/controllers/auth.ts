import { Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw Error("User does not exists");
  }
  if (!compareSync(password, user.password)) {
    throw Error("Incorrect password");
  }
  const token= jwt.sign({
    userId:user.id,
    userRole:user.role
  },JWT_SECRET)

  res.json({user,token})
};

export const signup = async (req: Request, res: Response) => {
  console.log(req.body, "__s");
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw Error("User already exists !");
  }
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  res.json(user);
};