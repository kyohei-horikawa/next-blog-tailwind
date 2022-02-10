import fs from "fs";
import { join } from "path";

const postsDirectory = join("./public", "posts");

export const getDirSlugs = () => {
  const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true });
  const dirSlugs = allDirents
    .filter((dirent) => !dirent.isFile())
    .map(({ name }) => name);
  return dirSlugs;
};
