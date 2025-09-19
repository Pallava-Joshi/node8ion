import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

export const createCredentials = async (req: Request, res: Response) => {
  try {
    const { platform, title, data } = req.body;
    const credentials = await prismaClient.credentials.create({
      data: {
        platform,
        title,
        data,
      },
    });
    res.json({
      credentials,
    });
  } catch (e) {
    console.log(e);
    res.json({
      error: "invalid credentials",
    });
  }
};

export const deleteCredentials = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = prismaClient.credentials.delete({
    where: {
      id,
    },
  });
};
