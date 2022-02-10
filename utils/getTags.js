import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "posts");

export const getTags = () => {
  const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true });
  const dirNames = allDirents
    .filter((dirent) => !dirent.isFile())
    .map(({ name }) => name);
  const tags = [];
  dirNames.forEach((dir) => {
    const fullPath = join(postsDirectory, dir, "index.md");
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
