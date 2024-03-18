import { Request, Response } from "express";

export async function checkStatus(_req: Request, res: Response): Promise<Response> {
  return res.status(200).json({ status: "ok" }).end();
}
