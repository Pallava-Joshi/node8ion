import express, { Router } from "express";
import { signin, signout, signup } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth";

export const authRouter: Router = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/singout", authMiddleware, signout);
