import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join("./public", "posts");

export const getPostByTag = (tag) => {
  const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true });
  const dirNames = allDirents
    .filter((dirent) => !dirent.isFile())
    .map(({ name }) => name);
  const posts = [];
  dirNames.forEach((dir) => {
    const fullPath = join(postsDirectory, dir, "index.md");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const items = {
      content: content,
      slug: dir,
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
