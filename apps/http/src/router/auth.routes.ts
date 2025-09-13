import express, { Router } from "express";
import { signin, signout, signup } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

export const signupRouter: Router = router.post("/signup", signup);
export const signinRouter: Router = router.post("/signin", signin);
export const signoutRouter: Router = router.post(
  "/singout",
  authMiddleware,
  signout
);
