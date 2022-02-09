import { Tags } from "./Tags";

export const Title = ({ title, date, tags }) => {
  return (
    <>
      <h1 className="text-blue-500 text-5xl text-bold border-y-4 my-4 py-8 border-gray-500 dark:border-gray-200">
        {title}
      </h1>
      <div className="flex justify-end">
        <p className="mb-4">{date}</p>
      </div>
      <Tags tags={tags} />
    </>
  );
};
