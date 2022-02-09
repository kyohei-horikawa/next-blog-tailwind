import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "posts");

export const getPostByTag = (tag) => {
  const files = fs.readdirSync(postsDirectory);
  const posts = [];
  files.forEach((file) => {
    const fullPath = join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const items = {
      content: content,
      fileName: file,
      title: data["title"],
      date: data["date"],
      tags: data["tags"],
    };
    data["tags"].forEach((_tag) => {
      if (_tag === tag) {
        posts.push(items);
      }
    });
  });
  return posts;
};