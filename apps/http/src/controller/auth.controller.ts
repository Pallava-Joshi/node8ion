import { Request, Response } from "express";
import { authMiddleware, authRequest } from "../middleware/auth";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!);
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name)
    return res.status(400).json({
      error: "All fields req",
    });
  const user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });
  if (user)
    return res.json({
      message: "user already exists",
    });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prismaClient.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  const token = generateToken(newUser.id);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
  });
  return res.json({
    message: "new user created succesfully",
    user: { id: newUser.id, email: newUser.email },
  });
};

export const signin = async (req: authRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    return res.json({
      error: "user not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const token = jwt.sign(user.id, process.env.JWT_SECRET!);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
  });
  res.json({
    message: "user signed in",
    user: { id: user.id, email: user.email },
  });
};

export const signout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.json({ message: "Logout successful" });
};
