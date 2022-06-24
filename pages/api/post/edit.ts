import { Request, Response } from "express";
import { postCreate } from "lib/createPost";
import { postDelete } from "lib/deletePost";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") return res.status(400).json({ status: "Bad Request." });

  const { slug, title, content, category, date }: IPost = req.body;

  if (!title.trim() || !content.trim()) {
    return res.status(204).send()
  }

  await postDelete(slug);

  const payload: ICreatedPostPayload = await postCreate({
    title,
    content,
    date,
    editAt: Date.now(),
    slug,
    category: category || "",
  });

  res.status(201).json({ status: payload.created, id: payload.id });
}