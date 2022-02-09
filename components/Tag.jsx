import Link from "next/link";
import { Tags } from "./Tags";

export const Tags = ({ post }) => {
  const { title, date, tags, fileName } = post;
  return (
    <div className="border-t-4 pt-4 my-4">
      <Link href={`/posts/${fileName.replace(/\.md$/, "")}`}>
        <a className="font-bold text-4xl ml-8">{title}</a>
      </Link>
      <p className="ml-8 mt-2">{date}</p>
      <div className="flex">
        <Tags tags={tags} />
      </div>
    </div>
  );
};
