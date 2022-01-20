import { Request, Response } from "express";
import { postCreate } from "lib/createPost";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") return res.status(400).json({ status: "Bad Request." });

  const { title, content }: IPost = req.body;

  if (!title.trim() || !content.trim()) {
    return res.status(204).send()
  }

  const payload: ICreatedPostPayload = await postCreate({
    title,
    content,
    date: Date.now(),
    slug: ""
  });

  res.status(201).json({ status: payload.created, id: payload.id });
}
