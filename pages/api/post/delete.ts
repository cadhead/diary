import { Request, Response } from "express";
import { postDelete } from "lib/deletePost";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") return res.status(400).json({ status: "Bad Request." });

  const { slug }: IPost = req.body;

  const payload = await postDelete(slug);

  res.status(201).json({ status: payload.deleted, id: payload.id });
}
