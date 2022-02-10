import fs from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "posts");

export const getPostsNames = () => {
  const files = fs.readdirSync(postsDirectory);
  const pageNames = [];
  files.forEach((file) => {
    if (!file.includes(".md")) {
      return;
    }
    pageNames.push(file.replace(/\.md$/, ""));
  });
  return pageNames;
};
