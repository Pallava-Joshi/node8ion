import { Request, Response } from "express";
import { authMiddleware, authRequest } from "../middleware/auth";
import jwt from "jsonwebtoken";

export const signup = (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name)
    return res.status(400).json({
      error: "All fields req",
    });

  const token = jwt.sign(email, process.env.JWT_SECRET!);
};
