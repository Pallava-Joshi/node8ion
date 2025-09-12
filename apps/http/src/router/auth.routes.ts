import express, { Router } from "express";
import { signup } from "../controller/auth.controller";

const router = Router();

export const authRouter: Router = router.post("/signup", signup);
