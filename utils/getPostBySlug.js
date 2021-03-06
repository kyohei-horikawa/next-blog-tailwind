import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join("./public", "posts");

export const getPostBySlug = (slug) => {
  const fullPath = join(postsDirectory, slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const items = {
    content: content,
    slug: slug,
    title: data["title"],
    date: data["date"],
    tags: data["tags"],
    summary: data["summary"],
  };
  return items;
};
