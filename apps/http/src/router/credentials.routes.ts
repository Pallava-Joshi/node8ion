import { Router } from "express";
import {
  createCredentials,
  deleteCredentials,
} from "../controller/credentials.controller";

export const credentialsRouter: Router = Router();

credentialsRouter.post("/new", createCredentials);
credentialsRouter.delete("/:id", deleteCredentials);
