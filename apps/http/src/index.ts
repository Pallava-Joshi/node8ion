import express from "express";
import { authRouter } from "./router/auth.routes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv/config";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRouter);

app.listen(3001, () => {
  console.log("Server running at 3000");
});
