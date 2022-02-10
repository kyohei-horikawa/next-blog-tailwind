import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "posts");

export const getPostBySlug = (slug) => {
  const fullPath = join(postsDirectory, slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const items = {
    content: content,
    dirName: slug,
    title: data["title"],
    date: data["date"],
    tags: data["tags"],
  };
  return items;
};
