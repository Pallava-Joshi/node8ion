import { Router } from "express";
import {
  createWorkflow,
  deleteWorkflow,
  updateWorkflow,
} from "../controller/workflow.controller";
import { authMiddleware } from "../middleware/auth";

export const workflowRouter: Router = Router();

workflowRouter.post("/new", authMiddleware, createWorkflow);
workflowRouter.patch("/:id", authMiddleware, updateWorkflow);
workflowRouter.delete("/:id", authMiddleware, deleteWorkflow);

workflowRouter.post("/:id/run");
