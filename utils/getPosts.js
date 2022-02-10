import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "posts");

export const getPosts = () => {
  const files = fs.readdirSync(postsDirectory);
  const posts = [];
  files.forEach((file) => {
    if (!file.includes(".md")) {
      return;
    }
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
    posts.push(items);
  });
  // sort posts by date in descending order
  posts.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
  return posts;
};
