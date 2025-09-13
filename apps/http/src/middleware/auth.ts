import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface authRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("Auth required");
    res.status(401).json({
      error: "auth required",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (e) {
    console.log(e);
    res.json({
      error: "token invalid",
    });
  }
};
