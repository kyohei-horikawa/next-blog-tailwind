import fs from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "posts");

export const getPostsNames = () => {
  const files = fs.readdirSync(postsDirectory);
  const pageNames = [];
  files.forEach((file) => {
    pageNames.push(file.replace(/\.md$/, ""));
  });
  return pageNames;
};
