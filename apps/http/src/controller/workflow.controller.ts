import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";

export const createWorkflow = async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title)
    return res.json({
      error: "title not found",
    });
  const nodes = {};
  const Connections = {};
  const workflow = await prismaClient.workflow.create({
    data: {
      title,
      nodes,
      Connections,
    },
  });
  res.json({
    workflow,
  });
};

export const updateWorkflow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, nodes, Connections, enabled } = req.body;

    const workflow = prismaClient.workflow.upsert({
      where: {
        id,
      },
      update: {
        title,
        nodes,
        Connections,
        enabled,
      },
      create: {
        id,
        title: title ?? "untitled",
        nodes: nodes ?? {},
        Connections: Connections ?? {},
        enabled: enabled ?? false,
      },
    });
    return res.json({
      workflow,
    });
  } catch (e) {
    console.log(e);
    res.json({ error: "invalid workflow details" });
  }
};

export const deleteWorkflow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workflow = prismaClient.workflow.delete({
      where: {
        id,
      },
    });
    res.json({
      workflow,
    });
  } catch (e) {
    console.log(e);
    res.json({ error: "delete error" });
  }
};
