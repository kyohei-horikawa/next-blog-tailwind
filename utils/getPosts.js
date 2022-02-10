import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join("./public", "posts");

export const getPosts = () => {
  const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true });
  const dirNames = allDirents
    .filter((dirent) => !dirent.isFile())
    .map(({ name }) => name);
  const posts = [];
  dirNames.forEach((dir) => {
    const filePath = join(postsDirectory, dir, "index.md");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const items = {
      content: content,
      dirName: dir,
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
