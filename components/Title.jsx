import { Tags } from "components/Tags";
import Image from "next/image";

export const Title = ({ title, date, tags }) => {
  const mainTag = tags[0];
  return (
    <>
      <h1 className="text-blue-500 text-5xl text-bold border-y-4 my-4 py-8 border-gray-500 dark:border-gray-200">
        {title}
      </h1>
      <div className="flex justify-end">
        <p className="mb-4">{date}</p>
      </div>
      <Tags tags={tags} />
      <div className="pt-4 pb-8">
        <Image
          src={`/${mainTag}.png`}
          width={2} //縦横比
          height={1}
          layout="responsive"
        />
      </div>
    </>
  );
};
