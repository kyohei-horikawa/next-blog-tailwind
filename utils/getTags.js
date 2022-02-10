import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "posts");

export const getTags = () => {
  const files = fs.readdirSync(postsDirectory);
  const tags = [];
  files.forEach((file) => {
    if (!file.includes(".md")) {
      return;
    }
    const fullPath = join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    data["tags"].forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  return tags;
};
