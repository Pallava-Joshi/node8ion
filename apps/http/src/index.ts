import express from "express";
import { authRouter } from "./router/auth.routes";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { workflowRouter } from "./router/workflow.routes";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/workflow", workflowRouter);

app.listen(3001, () => {
  console.log("Server running at 3000");
});
