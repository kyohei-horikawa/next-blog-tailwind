import Link from "next/link";
import { Tags } from "components/Tags";
import Image from "next/image";

export const Post = ({ post }) => {
  const { title, date, tags, fileName } = post;
  const mainTag = tags[0];
  return (
    <div className="flex items-center border-t-4 border-gray-400 dark:border-gray-100 pt-4 my-4">
      <div>
        <Image
          src={`/${mainTag}.png`}
          width={250}
          height={150}
          layout="fixed"
        />
      </div>
      <div className="pl-8">
        <Link href={`/posts/${fileName.replace(/\.md$/, "")}`}>
          <a className="font-bold text-4xl ml-8">{title}</a>
        </Link>
        <p className="ml-8 mt-2">{date}</p>
        <div className="flex">
          <Tags tags={tags} title={title} />
        </div>
      </div>
    </div>
  );
};
