import Link from "next/link";
import { Tags } from "components/Tags";
import Image from "next/image";

export const Post = ({ post }) => {
  const { title, date, tags, slug } = post;
  return (
    <div
      key={post.title}
      className="flex items-center border-t-4 border-gray-400 dark:border-gray-100 pt-4 my-4"
    >
      <div className="w-[100px] sm:w-[250px]">
        <Image
          src={`/posts/${slug}/cover.png`}
          width={250}
          height={150}
          layout="responsive"
          priority={true}
        />
      </div>
      <div className="pl-8 w-[200px]">
        <Link href={`/posts/${slug}`}>
          <a className="font-bold text-4xl ml-8">{title}</a>
        </Link>
        <p className="ml-8 mt-2">{date}</p>
        <Tags tags={tags} title={title} />
      </div>
    </div>
  );
};
