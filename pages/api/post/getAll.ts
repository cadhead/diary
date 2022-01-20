import { getAllPosts } from "lib/getPosts";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "GET") return res.status(400).json({ status: "Bad Request." });
  
  const allPosts = getAllPosts(["title", "content", "date", "slug"]);

  res.status(200).json(allPosts);
}
